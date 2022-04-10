import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BackendConfigService } from './config.service';
import  configuration  from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      cache: true,
    }),
  ],
  providers: [ConfigService, BackendConfigService],
  exports: [ConfigService, BackendConfigService],
}) 
export class BackendConfigModule {}
