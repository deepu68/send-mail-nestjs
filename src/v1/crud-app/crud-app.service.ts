import { Injectable, Logger } from '@nestjs/common';
import { SendOtpDto, UserDto, VerifyOtpDto } from 'src/utils/dtos/user.dto';
import { Connection } from 'typeorm';
import { MailService } from '../mail/mail.service';
import { UserRepository } from 'src/repositories/user.repository';

@Injectable()
export class CrudAppService {
  private logger: Logger;
  private userRepository: UserRepository;
  constructor(private readonly connection: Connection, private mailService: MailService) {
    this.logger = new Logger('UserService');
    this.userRepository = this.connection.getCustomRepository(UserRepository);
  }

  getHello(): string {
    return 'Hello World!';
  }

  public async addUser(userDto: UserDto): Promise<any> {
    try {
      const result = await this.userRepository.addUser(userDto);
      return `User added successfully ${result.id}`;
    } catch (error) {
      this.logger.error(error);
      return error;
    }
  }

  public async sendOtp(sendOtpDto: SendOtpDto): Promise<any> {
    try {
      const otp = Math.floor(100000 + Math.random() * 900000);
      const result = await this.mailService.sendMail(sendOtpDto.email, `${otp}`);
      if (result) {
        const userDto: UserDto = { email: sendOtpDto.email, otp: `${otp}` } as UserDto;
        await this.userRepository.addUser(userDto);
        return 'OTP sent successfully';
      } else {
        return 'Failed to send OTP'
      }
    } catch (error) {
      return error;
    }
  }

  public async verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<any> {
    try {
      const getUser = await this.userRepository.getUserByEmail(verifyOtpDto.email);
      if (!getUser) {
        return 'User not found';
      }

      if (getUser.otp !== verifyOtpDto.otp) {
        return 'Invalid OTP';
      }

      return 'OTP verification successful.';
    } catch (error) {
      return error;
    }
  }
}
