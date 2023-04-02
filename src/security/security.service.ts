import { CrawlerRepository } from './../crawler/crawler.repository';
import { Injectable } from '@nestjs/common';
import { newsEntity } from '../crawler/entities/news.entity';
import { CreateSecurityDto } from './dto/create-security.dto';
import { UpdateSecurityDto } from './dto/update-security.dto';

@Injectable()
export class SecurityService {
  constructor(private readonly crawlerRepository: CrawlerRepository) {}

  create(createSecurityDto: CreateSecurityDto) {
    return 'This action adds a new security';
  }

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

  update(id: number, updateSecurityDto: UpdateSecurityDto) {
    return `This action updates a #${id} security`;
  }

  remove(id: number) {
    return `This action removes a #${id} security`;
  }
}
