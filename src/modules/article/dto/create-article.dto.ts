import { User } from '@/modules/user/entities/user.entity';
import { EnumStatus } from '@/types/user';
import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  cover: string;

  @IsString()
  description: string;

  @IsNumberString()
  status: EnumStatus;

  user?: User;
}
