import { PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { QueryBaseDto } from '@/global/QueryBaseDto';
import { Optional } from '@nestjs/common';

export class QueryLikeDto extends PartialType(QueryBaseDto) {
  @Optional()
  @IsString()
  articleId: string;

  @Optional()
  @IsString()
  commentId: string;

  @Optional()
  @IsString()
  userId: string;
}
