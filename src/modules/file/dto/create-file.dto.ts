import { User } from '@/modules/user/entities/user.entity';
import { IsNotEmpty, IsNotEmptyObject, IsString } from 'class-validator';

export class CreateFileDto {
  @IsNotEmptyObject()
  user: User;

  @IsString()
  fieldname: string;

  @IsString()
  @IsNotEmpty()
  originalname: string;

  @IsString()
  encoding: string;

  @IsString()
  mimetype: string;

  @IsString()
  size: string;

  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  key: string;

  @IsString()
  @IsNotEmpty()
  bucket: string;
}
