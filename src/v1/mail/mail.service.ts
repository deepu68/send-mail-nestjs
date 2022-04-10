import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Config } from 'src/config/configuration';

@Injectable()
export class MailService {
  private logger: Logger;
  constructor(private readonly mailerService: MailerService) {
    this.logger = new Logger('UserService');
  }

  public async sendMail(email: string, otp: string): Promise<any> {
    const response = await this.mailerService.sendMail({
      to: `${email}`,
      from: `${Config().mailerOtpions.sender_email}`,
      subject: 'One time password for user registration',
      text: 'Welcome',
      html: `<b>${otp} Otp for user registration.</b>`,
    });
    console.log(response);
    if (response.rejected.length) {
      return false;
    } else {
      return true;
    }
  }
}
