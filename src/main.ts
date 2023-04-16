import { LicenseModule } from './license/license.module';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SecurityModule } from './security/security.module';

async function bootstrap() {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Security News Crawler')
    .setDescription('보안 뉴스를 크롤링한 데이터를 제공하는 API')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    include: [LicenseModule, SecurityModule],
  });
  SwaggerModule.setup('doc', app, document);
  await app.listen(3000);
}
bootstrap();
