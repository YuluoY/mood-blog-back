import { IsNotEmpty } from 'class-validator';
import { Optional } from '@nestjs/common';

export class CreateCommentDto {
  @IsNotEmpty({ message: '评论内容不能为空' })
  content: string;

  @IsNotEmpty({ message: '用户id不能为空' })
  userId: string;

  @Optional()
  articleId: string;

  @Optional()
  parentId: string;
}
