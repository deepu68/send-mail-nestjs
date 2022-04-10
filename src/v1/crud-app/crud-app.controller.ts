import { Body, Controller, Get, Logger, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserDto, SendOtpDto, VerifyOtpDto } from 'src/utils/dtos/user.dto';
import { CrudAppService } from './crud-app.service';

@Controller('user')
export class CrudAppController {
  private logger: Logger;
  constructor(private readonly crudAppService: CrudAppService) {
    this.logger = new Logger('UserController');
  }

  @Get()
  getHello(): string {
    return this.crudAppService.getHello();
  }

  @Post()
  @UsePipes(ValidationPipe)
  public async addUser(@Body() userDto: UserDto): Promise<any> {
    return this.crudAppService.addUser(userDto);
  }

  @Post('/send-otp')
  @UsePipes(ValidationPipe)
  public async sendOtp(@Body() sendOtpDto: SendOtpDto) {
    return this.crudAppService.sendOtp(sendOtpDto);
  }

  @Post('/verify-otp')
  @UsePipes(ValidationPipe)
  public async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    return this.crudAppService.verifyOtp(verifyOtpDto);
  }
}
