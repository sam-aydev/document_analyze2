import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { config } from 'aws-sdk';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('/api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Document Analyzer')
    .setDescription('Use the base api url as http://localhost:3001')
    .setTermsOfService('http://localhost:3000/tos')
    .addServer('http://localhost:3001')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('v1', app, document);
  const configService = app.get(ConfigService)

  config.update({
    credentials: {
      accessKeyId: configService.get("appConfig.awsAccessKeyId"),
      secretAccessKey: configService.get("appConfig.awsSecretAccess")
    },
    region: configService.get("appConfig.awsRegion")
  })
  app.enableCors()
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
