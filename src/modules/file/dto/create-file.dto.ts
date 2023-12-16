import { User } from '@/modules/user/entities/user.entity';
import { IsNotEmpty, IsNotEmptyObject, IsString } from 'class-validator';

export class CreateFileDto {
  @IsNotEmptyObject()
  user: User;

  @IsString({ message: '字段名必须是字符串' })
  fieldname: string;

  @IsString()
  @IsNotEmpty({ message: '原始文件名不能为空' })
  originalname: string;

  @IsString()
  encoding: string;

  @IsString()
  mimetype: string;

  @IsString()
  size: string;

  @IsString()
  @IsNotEmpty({ message: '文件地址不能为空' })
  url: string;

  @IsString()
  @IsNotEmpty({ message: '文件名路径不能为空' })
  key: string;

  @IsString()
  @IsNotEmpty({ message: 'bucket不能为空' })
  bucket: string;
}
