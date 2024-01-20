import { IsNotEmpty } from 'class-validator';
import { Optional } from '@nestjs/common';

export class CreateCategoryDto {
  @IsNotEmpty({ message: '分类名称不能为空' })
  cateName: string;

  @Optional()
  article?: string[];
}
