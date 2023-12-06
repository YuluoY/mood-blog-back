import { AppConfig } from '@/config';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class LoginUserDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  username?: string;

  @Length(6, 20)
  @IsString()
  password: string;

  @Length(AppConfig.plugin.svgCaptcha.size)
  code: string;
}
