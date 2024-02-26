import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {BadRequestException, ValidationPipe} from "@nestjs/common";
import * as process from "process";
import {APP_PORT} from "@environments";

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  const PORT = APP_PORT!

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
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/v1/docs', app, document);


  await app.listen(PORT);
}

bootstrap();
