import { Module } from '@nestjs/common';
import { CrudAppController } from './crud-app.controller';
import { MailService } from '../mail/mail.service';
import { BackendConfigService } from 'src/config/config.service';
import { CrudAppService } from './crud-app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/repositories/user.repository';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]),
    MailModule
  ],
  controllers: [CrudAppController],
  providers: [CrudAppService, MailService, BackendConfigService],
})
export class CrudAppModule {}
