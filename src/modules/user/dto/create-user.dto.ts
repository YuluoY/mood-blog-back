import { IsEmail, IsIP, IsPhoneNumber, IsString, Length, IsNotEmpty } from 'class-validator';
import { AppConfig } from 'src/config';

export class CreateUserDto {
  @IsEmail()
  email?: string;

  @IsString()
  username?: string;

  @IsPhoneNumber('CN')
  phone?: string;

  @Length(6, 20)
  @IsNotEmpty()
  password: string;

  @Length(AppConfig.plugin.svgCaptcha.size)
  code?: string; // 验证码，这里是可选，但是在验证的时候是必须的

  @IsIP()
  ip?: string; // ip 地址

  @IsString()
  userAgent?: string; // 浏览器信息

  @IsString()
  location?: string;
}
