import { QueryBaseDto } from '@/global/QueryBaseDto';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Optional } from '@nestjs/common';

export class QueryCategoryDto extends PartialType(QueryBaseDto) {
  @ApiProperty({ description: '分类名称' })
  @Optional()
  cateName: string;

  @ApiProperty({ description: '文章id' })
  @Optional()
  articleId: string;
}
