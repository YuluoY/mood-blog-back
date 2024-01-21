import { IsString } from 'class-validator';
import { Optional } from '@nestjs/common';
import { QueryBaseDto } from '@/global/QueryBaseDto';

export class QueryArticleDto extends QueryBaseDto {
  @IsString()
  @Optional()
  title: string;

  @Optional()
  userId: string;

  @Optional()
  articleId: string;

  @Optional()
  parentId: string;

  @Optional()
  withDeleted: boolean;
}
