import { IsEmail, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';
import { Optional } from '@nestjs/common';

export class CreateCommentDto {
  @IsNotEmpty({ message: '评论内容不能为空' })
  content: string;

  @IsNotEmpty({ message: '昵称不能为空' })
  nickname: string;

  @IsOptional()
  @IsEmail({}, { message: '邮箱格式不正确' })
  email: string;

  @IsOptional()
  @IsUrl({}, { message: '网址格式不正确' })
  website: string;

  @IsOptional()
  isSubscribe: boolean;

  @IsOptional()
  isTop: boolean;

  @IsNotEmpty({ message: '用户id不能为空' })
  userId: string;

  @Optional()
  articleId: string;

  @Optional()
  parentId: string;
}
