import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LicenseService {
  constructor(
    private userRepository: ,
    private jwtService: JwtService,
  ) {}

  async signUp(AuthCredentialDto: AuthCredentialDto): Promise<void> {
    return this.userRepository.createUser(AuthCredentialDto);
  }

  async signIn(
    AuthCredentialDto: AuthCredentialDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = AuthCredentialDto;
    const user = await this.userRepository.findOneBy({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      // 유저 토큰 생성 (secret + payload)
      const payload = { username }; // 중요한 정보는 넣어두면 안됨.
      const accessToken = await this.jwtService.sign(payload);

      return { accessToken };
    } else {
      throw new UnauthorizedException('login Failed');
    }
  }
}
