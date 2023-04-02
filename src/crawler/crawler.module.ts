import { Module, forwardRef } from '@nestjs/common';
import { CrawlerController } from './crawler.controller';
import { CrawlerRepository } from './crawler.repository';
import { SecurityModule } from 'src/security/security.module';

@Module({
  imports: [forwardRef(() => SecurityModule)],
  providers: [CrawlerRepository],
  controllers: [CrawlerController],
  exports: [CrawlerRepository],
})
export class CrawlerModule {}
