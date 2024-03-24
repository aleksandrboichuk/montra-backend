import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {BadRequestException, ValidationPipe} from "@nestjs/common";
import * as process from "process";
import {API_DOC_URI, API_KEY_HEADER_NAME, APP_PORT, BEARER_AUTH_NAME} from "./environments/environments";

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  const PORT = APP_PORT

  // app configuration
  app.enableCors();
  app.setGlobalPrefix('/v1');

  // validation
  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (errors) => new BadRequestException(errors)
  }));

  // swagger
  const config = new DocumentBuilder()
      .setTitle('Montra API')
      .setDescription('The Montra API description')
      .setVersion('1.0')
      .addApiKey({
        type: 'apiKey',
        name: API_KEY_HEADER_NAME,
        in: 'header'},
          API_KEY_HEADER_NAME)
      .addBearerAuth({
        type: "http",
        name: "Authorization",
        bearerFormat: 'Bearer',
        in: 'header'
      }, BEARER_AUTH_NAME)
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(API_DOC_URI, app, document);


  await app.listen(PORT);
}

bootstrap();
