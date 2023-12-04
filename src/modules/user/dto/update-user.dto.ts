import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsEnum, IsNumberString, IsString, IsUUID, IsUrl, IsDateString, IsNotEmpty } from 'class-validator';
import { EnumRole, EnumStatus } from 'src/types/user';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsString()
  username?: string;

  @IsString()
  nickname?: string;

  @IsString()
  password?: string;

  @IsEmail()
  email?: string;

  @IsNumberString()
  phone?: string;

  @IsUrl()
  avatar?: string;

  @IsUrl()
  cover?: string;

  @IsString()
  website?: string;

  @IsString()
  bio?: string;

  @IsString()
  location?: string;

  @IsEnum(EnumStatus)
  status?: EnumStatus;

  @IsEnum(EnumRole)
  role?: EnumRole;

  @IsDateString()
  createdAt?: Date;

  @IsDateString()
  updatedAt?: Date;

  @IsDateString()
  deletedAt?: Date;

  @IsDateString()
  lastLoginAt?: Date;
}
