import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(helmet());
  const config = app.get(ConfigService);
  const port = config.get<number>('PORT');
  await app.listen(port);
  console.log(`API listening on http://localhost:${port}`);
}
bootstrap();
