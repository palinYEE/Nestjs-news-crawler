import { Module } from '@nestjs/common';
import { CrawlerController } from './crawler.controller';
import { CrawlerRepository } from './crawler.repository';

@Module({
  providers: [CrawlerRepository],
  controllers: [CrawlerController],
})
export class CrawlerModule {}
