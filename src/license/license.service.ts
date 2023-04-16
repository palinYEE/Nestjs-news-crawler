import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import * as crypto from 'crypto';
import { promisify } from 'util';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialDto } from './dto/user-credential.dto';

@Injectable()
export class LicenseService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  private logger = new Logger(LicenseService.name);
  private readonly asyncPbkdf2 = promisify(crypto.pbkdf2);

  async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
    const { username, password } = authCredentialDto;
    console.log('test1', username, password);
    const dupCheck = await this.userRepository.findOneByUsername(username);
    console.log('test2', dupCheck);
    if (dupCheck) {
      throw new HttpException(
        '이미 등록되어있는 사용자 입니다.',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const passwordBuffer = Buffer.from(password, 'utf-8');
    const saltBuffer = Buffer.from(process.env.PBKDF2_SALT, 'base64');
    try {
      const pbkdf2PasswordBuffer = await this.asyncPbkdf2(
        passwordBuffer,
        saltBuffer,
        1000,
        64,
        'sha256',
      );
      await this.userRepository.createUser(
        username,
        pbkdf2PasswordBuffer.toString('base64'),
      );
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }

  async signIn(
    authCredentialDto: AuthCredentialDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialDto;
    const pbkdf2PasswordBuffer = await this.asyncPbkdf2(
      password,
      process.env.PBKDF2_SALT,
      10000,
      64,
      'sha512',
    );
    const user = await this.userRepository.findOneByUsernameAndPassword(
      username,
      pbkdf2PasswordBuffer.toString('base64'),
    );

    if (user) {
      // 유저 토큰 생성 (secret + payload)
      const payload = { username }; // 중요한 정보는 넣어두면 안됨.
      const accessToken = await this.jwtService.sign(payload);

      return { accessToken };
    } else {
      throw new HttpException('login Failed', HttpStatus.UNAUTHORIZED);
    }
  }
}
