import { IsNotEmpty } from 'class-validator';
import { Optional } from '@nestjs/common';

export class CreateCategoryDto {
  @IsNotEmpty({ message: '分类名称不能为空' })
  cateName: string;

  @IsNotEmpty({ message: '分类别名不能为空' })
  cateAlias: string;

  @Optional()
  cateColor?: string;

  @Optional()
  article?: string[];
}
