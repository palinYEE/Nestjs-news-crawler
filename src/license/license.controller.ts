import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { LicenseService } from './license.service';
import { AuthCredentialDto } from './dto/user-credential.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('License Module')
@Controller('license')
export class LicenseController {
  constructor(private readonly licenseService: LicenseService) {}

  @Post('signUp')
  @ApiOperation({ summary: '회원가입 API' })
  @ApiResponse({
    status: 201,
    description: '회원가입 성공',
  })
  @ApiResponse({
    status: 401,
    description:
      '회원가입에 실패 (이미 등록되어있는 사용자, 또는 데이터 저장 에러 시에 발생)',
  })
  async signUp(@Body() userInfo: AuthCredentialDto) {
    return await this.licenseService.signUp(userInfo);
  }

  @Get('getLicense')
  @ApiOperation({ summary: '라이선스 발급 API' })
  async getLicense(@Body() userInfo: AuthCredentialDto) {
    return await this.licenseService.getLicense(userInfo);
  }

  @Get('checkLicenseStatus')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: '모든 유저에 대한 발급된 라이선스 리스트 확인 API' })
  async checkLicenseStuatus() {
    return await this.licenseService.checkLicenseStuatus();
  }

  @Get('userLicenseList')
  @ApiOperation({ summary: '특정 유저에 대한 발급된 라이선스 리스트 확인 API' })
  async getUserLicenseList(@Body() userInfo: AuthCredentialDto) {
    return await this.licenseService.getUserLicenseList(userInfo);
  }

  @Get('jwtTokenCheck/:token')
  @ApiOperation({ summary: '라이선스에 대한 정보 확인 API' })
  checkJwtToken(@Param('token') token: string) {
    return this.licenseService.checkJwtToken(token);
  }
}
