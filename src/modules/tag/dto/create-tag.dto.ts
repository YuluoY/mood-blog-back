import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTagDto {
  @IsNotEmpty({ message: '标签名称不能为空' })
  tagName: string;

  @IsOptional()
  tagColor: string;
}
