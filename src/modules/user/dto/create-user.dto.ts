import { IsEmail, IsIP, IsPhoneNumber, IsString, Length, IsNotEmpty, IsOptional } from 'class-validator';
import { AppConfig } from 'src/config';

export class CreateUserDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  username?: string;

  @IsPhoneNumber('CN')
  @IsOptional()
  phone?: string;

  @Length(6, 20)
  @IsNotEmpty()
  password: string;

  @Length(AppConfig.plugin.svgCaptcha.size)
  @IsOptional()
  code?: string; // 验证码，这里是可选，但是在验证的时候是必须的

  @IsIP()
  @IsOptional()
  ip?: string; // ip 地址

  @IsString()
  @IsOptional()
  userAgent?: string; // 浏览器信息

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  country?: string;

  @IsString()
  @IsOptional()
  province?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  district?: string;

  @IsString()
  @IsOptional()
  street?: string;
}
