import { Module, forwardRef } from '@nestjs/common';
import { SecurityService } from './security.service';
import { SecurityController } from './security.controller';
import { HttpModule } from '@nestjs/axios';
import { CrawlerModule } from 'src/crawler/crawler.module';
import { LicenseModule } from 'src/license/license.module';

@Module({
  imports: [
    HttpModule,
    forwardRef(() => CrawlerModule),
    forwardRef(() => LicenseModule),
  ],
  controllers: [SecurityController],
  providers: [SecurityService],
})
export class SecurityModule {}
