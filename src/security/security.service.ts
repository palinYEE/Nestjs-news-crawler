import { CrawlerRepository } from './../crawler/crawler.repository';
import { Injectable } from '@nestjs/common';
import { newsEntity } from '../crawler/entities/news.entity';

@Injectable()
export class SecurityService {
  constructor(private readonly crawlerRepository: CrawlerRepository) {}

  async findAll() {
    const result: newsEntity[] = await this.crawlerRepository.getAll();
    return {
      count: result.length,
      data: result,
    };
  }

  async findOne(id: string) {
    const result: newsEntity = await this.crawlerRepository.getByUUID(id);
    return {
      result: result ? true : false,
      data: result,
    };
  }

  async findByDate(start: Date, end: Date) {
    const result: newsEntity[] = await this.crawlerRepository.getByDate(
      start,
      end,
    );
    return {
      count: result.length,
      data: result,
    };
  }
}
