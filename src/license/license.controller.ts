import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { LicenseService } from './license.service';
import { AuthCredentialDto } from './dto/user-credential.dto';

@Controller('license')
export class LicenseController {
  constructor(private readonly licenseService: LicenseService) {}

  @Post('signUp')
  async signUp(@Body() userInfo: AuthCredentialDto) {
    return await this.licenseService.signUp(userInfo);
  }

  @Get('getLicense')
  async getLicense(@Body() userInfo: AuthCredentialDto) {
    return await this.licenseService.getLicense(userInfo);
  }

  @Get('checkLicenseStatus')
  async checkLicenseStuatus() {
    return await this.licenseService.checkLicenseStuatus();
  }

  @Get('userLicenseList')
  async getUserLicenseList(@Body() userInfo: AuthCredentialDto) {
    return await this.licenseService.getUserLicenseList(userInfo);
  }

  @Get('jwtTokenCheck/:token')
  checkJwtToken(@Param('token') token: string) {
    return this.licenseService.checkJwtToken(token);
  }
}
