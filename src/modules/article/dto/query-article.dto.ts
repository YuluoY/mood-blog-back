import { IsString } from 'class-validator';
import { Optional } from '@nestjs/common';
import { QueryBaseDto } from '@/global/QueryBaseDto';
import { EnumStatus } from '@/types/user';

export class QueryArticleDto extends QueryBaseDto {
  @IsString()
  @Optional()
  title: string;

  @Optional()
  user: string;

  @Optional()
  articleId: string;

  @Optional()
  parentId: string;

  @Optional()
  isTop: boolean;

  @Optional()
  isRecommend: boolean;

  @Optional()
  tags: string[];

  @Optional()
  category: string;

  @Optional()
  status: EnumStatus;
}
