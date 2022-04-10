import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BackendConfigModule } from './config/config.module';
import { BackendConfigService } from './config/config.service';
import { CrudAppModule } from './v1/crud-app/crud-app.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: BackendConfigService) => config.typeormConfigOptions,
      inject: [BackendConfigService],
      imports: [BackendConfigModule],
    }),
    CrudAppModule
  ],
})
export class AppModule {}
