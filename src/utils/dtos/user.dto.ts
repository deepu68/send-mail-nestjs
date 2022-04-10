import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  otp: string;
  
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class SendOtpDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class VerifyOtpDto {
  @IsString()
  @IsNotEmpty()
  otp: string;
  
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}