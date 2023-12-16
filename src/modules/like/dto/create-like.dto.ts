import { IsNotEmpty } from 'class-validator';
import { Optional } from '@nestjs/common';

export class CreateLikeDto {
  @IsNotEmpty({ message: '用户id不能为空' })
  userId: string;

  @Optional()
  articleId: string;

  @Optional()
  commentId: string;
}
