import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    transform: true,
  }
  ))
  app.use(cors({
    origin: 'https://gen-max.vercel.app', // Replace with your allowed origin
  }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//