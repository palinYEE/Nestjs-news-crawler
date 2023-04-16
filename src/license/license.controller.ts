import { Controller, Post, Body } from '@nestjs/common';
import { LicenseService } from './license.service';
import { AuthCredentialDto } from './dto/user-credential.dto';

@Controller('license')
export class LicenseController {
  constructor(private readonly licenseService: LicenseService) {}

  @Post('signUp')
  async signUp(@Body() userInfo: AuthCredentialDto) {
    return await this.licenseService.signUp(userInfo);
  }
}
