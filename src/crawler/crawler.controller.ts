import { Controller, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';
import * as convert from 'xml-js';
import * as cheerio from 'cheerio';
import * as iconv from 'iconv-lite';
import { loadConfig } from 'src/common/utils/fileHandler';
import { SecurityNewsDto } from './dtos/securityNews.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CrawlerRepository } from './crawler.repository';

const apiList = loadConfig();

@Controller('crawler')
export class CrawlerController {
  constructor(
    @InjectRepository(CrawlerRepository)
    private readonly crawlerRepository: CrawlerRepository,
  ) {}

  private readonly logger = new Logger(CrawlerController.name);

  /**
   * 입력한 url의 html 소스를 가져오는 함수
   * @param url 입력 url
   * @returns html 소스
   */
  async crawlerWeb(url: string): Promise<string> {
    try {
      const { data: html } = await axios.get(url, {
        responseType: 'arraybuffer',
      });
      const decodedData = iconv.decode(Buffer.from(html), 'euc-kr');
      return decodedData;
    } catch (error) {
      throw new Error(`[crawlerWeb] - ${error}`);
    }
  }

  /**
   * 보안 뉴스 데이터를 가져온 후 파싱하는 함수
   * @param html html 문자열
   * @returns SecurityNewsDto Array
   */
  securityHtmlParser(html: string): Array<SecurityNewsDto> {
    const resultList: Array<SecurityNewsDto> = [];
    const xmlToJson = JSON.parse(
      convert.xml2json(html, { compact: true, spaces: 4 }),
    );

    //* SecurityNewsDto로 Parsing 하는 부분
    xmlToJson['rss']['channel']['item'].forEach((article) => {
      resultList.push({
        title: article['title']['_cdata'],
        url: article['link']['_text'],
        description: article['description']['_cdata'],
        reporter: article['dc:creator']['_cdata'],
        date_created: new Date(Date.parse(article['dc:date']['_text'])),
      });
    });

    return resultList;
  }

  //* 보안 뉴스에서 보안 부분 API 호출 스케쥴러.
  @Cron('10 * * * * *')
  async securityCrawler() {
    const target: string = apiList['securityNews']['main']['security'];
    const html = await this.crawlerWeb(target);
    const dataList: Array<SecurityNewsDto> = this.securityHtmlParser(html);
    console.log(dataList);
    //* TODO: repository 로 데이터를 저장하는 로직 추가
    this.crawlerRepository.inputData(dataList);
  }
}
