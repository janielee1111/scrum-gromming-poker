import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const webOrigin = process.env.WEB_ORIGIN;

  if (!webOrigin) {
    throw new Error('WEB_ORIGIN must be set to the frontend origin');
  }

  app.enableCors({ origin: webOrigin });
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
