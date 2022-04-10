import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-options.interface';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { getMetadataArgsStorage } from 'typeorm';

@Injectable()
export class BackendConfigService {
  constructor(private configService: ConfigService) {}

  get env(): string {
    return this.configService.get<string>('nodeConfiguration.env');
  }

  get port(): number {
    return this.configService.get<number>('nodeconfiguration.port');
  }

  get mailerOptions(): any {
    return {
      transport: {
        host: this.configService.get<string>('mailerOtpions.smtp_host'),
        port: Number(this.configService.get<number>('mailerOtpions.smtp_port')),
        secure: false,
        auth: {
          user: this.configService.get<string>('mailerOtpions.smtp_user'),
          pass: this.configService.get<string>('mailerOtpions.smtp_password'),
        },
      },
      defaults: {
        from: this.configService.get<string>('mailerOtpions.senderEmail'),
      },
      preview: true,
      template: {
        dir: process.cwd() + '/template/',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    } as MailerOptions;
  }

  get typeormConfigOptions(): any {
    return {
      type: this.configService.get<string>('database.type'),
      replication: {
        master: {
          host: this.configService.get<string>('database.masterHost'),
          port: Number(this.configService.get<number>('database.port')),
          username: this.configService.get<string>('database.username'),
          password: this.configService.get<string>('database.password'),
          database: this.configService.get<string>('database.database'),
          schema: this.configService.get<string>('database.schema'),
        },
        slaves: [
          {
            host: this.configService.get<string>('database.slaveHost'),
            port: Number(this.configService.get<number>('database.port')),
            username: this.configService.get<string>('database.username'),
            password: this.configService.get<string>('database.password'),
            database: this.configService.get<string>('database.database'),
            schema: this.configService.get<string>('database.schema'),
          },
        ],
      },
      port: Number(this.configService.get<number>('database.port')),
      username: this.configService.get<string>('database.username'),
      password: this.configService.get<string>('database.password'),
      database: this.configService.get<string>('database.database'),
      schema: this.configService.get<string>('database.schema'),
      entities: getMetadataArgsStorage().tables.map(tbl => tbl.target),
      synchronize: Boolean(this.configService.get<boolean>('database.synchronize')),
      retryAttempts: Number(this.configService.get<number>('database.retryAttempts')),
      retryDelay: Number(this.configService.get<number>('database.retryDelay')),
      keepConnectionAlive: Boolean(this.configService.get<boolean>('database.keepConnectionAlive')),
      // logging: ['error'],
      // logger: 'simple-console',
    } as TypeOrmModuleOptions;
  }
}
