import { Module } from '@nestjs/common';
import { LicenseService } from './license.service';
import { LicenseController } from './license.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserRepository } from './repositories/user.repository';
import { LicenseRepository } from './repositories/license.repository';

/**
 * 해당 모듈은 라이선스를 발급해주는 모듈입니다.
 * 초기 모델로 발급된 라이선스는 본 프로젝트의 모든 API 를 지원합니다.
 * 라이선스를 발급하기 위해서는 로그인을 해야 합니다. (로그인을 위해서는 회원가입을 해야 합니다.)
 */
@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '2 days',
      },
    }),
  ],
  controllers: [LicenseController],
  providers: [LicenseService, JwtService, UserRepository, LicenseRepository],
})
export class LicenseModule {}
