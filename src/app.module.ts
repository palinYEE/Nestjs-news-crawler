import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecurityModule } from './security/security.module';
import { CrawlerModule } from './crawler/crawler.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MARIA_DB_HOST,
      port: parseInt(process.env.MARIA_DB_PORT),
      username: process.env.MARIA_DB_USER,
      password: process.env.MARIA_DB_PASSWORD,
      database: process.env.MARIA_DB_DATABASE,
      entities: [__dirname + '/**/**/entities/*.{ts,js}'],
      synchronize: false,
      logging: false,
    }),
    ScheduleModule.forRoot(),
    SecurityModule,
    CrawlerModule,
  ],
})
export class AppModule {}
