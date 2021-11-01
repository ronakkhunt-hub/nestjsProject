import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { MainModule } from './main.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(MainModule);
  app.enableCors();
  await app.listen(3002, () => {
    console.log(`3002 running`);
  });
}
bootstrap();
