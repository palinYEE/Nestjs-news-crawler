import { newsEntity } from './entities/news.entity';
import { Injectable, Logger } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { SecurityNewsDto } from './dtos/securityNews.dto';

@Injectable()
export class CrawlerRepository extends Repository<newsEntity> {
  constructor(private dataSource: DataSource) {
    super(newsEntity, dataSource.createEntityManager());
  }

  private readonly logger = new Logger(CrawlerRepository.name);

  async getAll(): Promise<newsEntity[]> {
    return await this.find();
  }

  async getByUUID(uuid: string): Promise<newsEntity> {
    return await this.findOneBy({ id: uuid });
  }

  async getByDate(start: Date, end: Date): Promise<newsEntity[]> {
    return await this.createQueryBuilder()
      .where(`date_created>='${start}'`)
      .andWhere(`date_created<='${end}'`)
      .getMany();
  }

  async inputData(dataList: Array<SecurityNewsDto>) {
    this.logger.log(`Security Data Insert Count : ${dataList.length}`);
    dataList.forEach(async (data) => {
      if (!(await this.findOneBy({ title: data.title }))) {
        const newsData = new newsEntity();
        newsData.type = 'security';
        newsData.title = data.title;
        newsData.url = data.url;
        newsData.description = data.description;
        newsData.reporter = data.reporter;
        newsData.date_created = data.date_created;
        newsData.save();
      } else {
        this.logger.log(`   * already crawling data : title - ${data.title}`);
      }
    });
  }
}
