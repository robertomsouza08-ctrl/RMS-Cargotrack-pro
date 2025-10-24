
import { NestFactory } from '@nestjs/core';
import { AppModule } from './module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors({ origin: process.env.CORS_ORIGINS?.split(',').map(s=>s.trim()) || '*' } as any));
  const port = Number(process.env.PORT) || 3000;
  await app.listen(port);
  console.log(`[API] RMS CargoTrack Pro listening on :${port} (env=${process.env.NODE_ENV||'dev'})`);
}
bootstrap();
