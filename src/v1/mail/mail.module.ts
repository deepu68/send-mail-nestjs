import { Module } from '@nestjs/common';
import { BackendConfigModule } from 'src/config/config.module';
import { BackendConfigService } from 'src/config/config.service';
import { MailerService } from '@nestjs-modules/mailer';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: (config: BackendConfigService) => config.mailerOptions,
      inject: [BackendConfigService],
      imports: [BackendConfigModule],
    })
  ],
  providers: [MailService, BackendConfigService],
})
export class MailModule {}
