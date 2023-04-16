import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import * as crypto from 'crypto';
import { promisify } from 'util';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialDto } from './dto/user-credential.dto';
import { LicenseRepository } from './repositories/license.repository';
import { licenseStatusDto } from './dto/license-status.dto';

@Injectable()
export class LicenseService {
  constructor(
    private userRepository: UserRepository,
    private licenseRepository: LicenseRepository,
    private jwtService: JwtService,
  ) {}

  private logger = new Logger(LicenseService.name);
  private readonly asyncPbkdf2 = promisify(crypto.pbkdf2);

  async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
    const { username, password } = authCredentialDto;
    console.log('11');
    const dupCheck = await this.userRepository.findOneByUsername(username);
    if (dupCheck) {
      throw new HttpException(
        '이미 등록되어있는 사용자 입니다.',
        HttpStatus.UNAUTHORIZED,
      );
    }
    try {
      const pbkdf2PasswordBuffer = await this.asyncPbkdf2(
        password,
        process.env.PBKDF2_SALT,
        10000,
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

  async getLicense(
    authCredentialDto: AuthCredentialDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialDto;
    const pbkdf2PasswordBuffer = await this.asyncPbkdf2(
      password,
      process.env.PBKDF2_SALT,
      10000,
      64,
      'sha256',
    );

    const user = await this.userRepository.findOneByUsernameAndPassword(
      username,
      pbkdf2PasswordBuffer.toString('base64'),
    );

    const [_, userLicenseValiCheckCount] =
      await this.licenseRepository.getLicenseStatusById(user);
    if (userLicenseValiCheckCount >= parseInt(process.env.TOKEN_MAX_COUNT)) {
      throw new HttpException(
        '이미 10개의 토큰을 발급했습니다. 기존 토큰을 사용해 주시기 바랍니다. ',
        HttpStatus.UNAUTHORIZED,
      );
    }
    if (user) {
      // 유저 토큰 생성 (secret + payload)
      const payload = { username }; // 중요한 정보는 넣어두면 안됨.
      const accessToken = await this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      });
      await this.licenseRepository.saveJwtToken(accessToken, user);
      return { accessToken };
    } else {
      throw new HttpException('login Failed', HttpStatus.UNAUTHORIZED);
    }
  }

  async checkLicenseStuatus() {
    const licenceAllDatas = this.licenseRepository.getAllLicenseData();

    // Grouping data by username
    const groupedData: Record<string, Array<string>> = {};

    (await licenceAllDatas).forEach((item) => {
      const username = item.user.username;
      const license = item.license;

      if (!groupedData[username]) {
        groupedData[username] = [];
      }

      groupedData[username].push(license);
    });

    const licenseStatusArray: licenseStatusDto[] = Object.entries(
      groupedData,
    ).map(([username, licenses]) => {
      const dto = new licenseStatusDto();
      dto.username = username;
      dto.license = licenses;
      dto.count = licenses.length;
      return dto;
    });

    return licenseStatusArray;
  }

  async getUserLicenseList(userInfo: AuthCredentialDto) {
    const pbkdf2PasswordBuffer = await this.asyncPbkdf2(
      userInfo.password,
      process.env.PBKDF2_SALT,
      10000,
      64,
      'sha256',
    );
    const user = await this.userRepository.findOneByUsernameAndPassword(
      userInfo.username,
      pbkdf2PasswordBuffer.toString('base64'),
    );
    if (user) {
      const [licenseList, count] =
        await this.licenseRepository.getLicenseStatusById(user);
      const licenses = licenseList.map((item) => {
        return item.license;
      });
      return {
        username: user.username,
        count: count,
        license: licenses,
      };
    } else {
      throw new HttpException(
        '입력한 계정은 없는 계정입니다. ',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async checkJwtToken(token: string) {
    return this.jwtService.decode(token);
  }
}
