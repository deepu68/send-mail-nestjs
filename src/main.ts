import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BackendConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const backendConfigService = app.get(BackendConfigService);
  await app.listen(backendConfigService.port);
}
bootstrap();
