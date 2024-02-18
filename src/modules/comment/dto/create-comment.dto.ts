import { IsEmail, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';
import { Optional } from '@nestjs/common';
import { User } from '@/modules/user/entities/user.entity';
import { Article } from '@/modules/article/entities/article.entity';
import { Visitor } from '@/modules/visitor/entities/visitor.entity';
import { Comment } from '@/modules/comment/entities/comment.entity';

export class CreateCommentDto {
  @IsNotEmpty({ message: '评论内容不能为空' })
  content: string;

  @IsNotEmpty({ message: '昵称不能为空' })
  nickname: string;

  @IsOptional()
  @IsEmail({}, { message: '邮箱格式不正确' })
  email: string;

  @IsOptional()
  website?: string;

  @IsOptional()
  isSubscribe: boolean;

  @IsOptional()
  qq: string;

  @IsOptional()
  avatar: string;

  @IsOptional()
  isTop: boolean;

  @IsOptional()
  reply: Comment;

  @IsOptional()
  visitor: Visitor;

  @IsOptional()
  user: User;

  @Optional()
  article: Article;

  @Optional()
  parent: Comment;
}
