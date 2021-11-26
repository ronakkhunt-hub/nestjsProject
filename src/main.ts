import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { MainModule } from './main.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(MainModule);
  app.useGlobalPipes(
    new ValidationPipe(),
  );
  app.enableCors();
  await app.listen(process.env.PORT, () => {
    console.log(`${process.env.PORT} runnings`);
  });
}
bootstrap();
