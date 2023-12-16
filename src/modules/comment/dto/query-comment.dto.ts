import { Optional } from '@nestjs/common';
import { QueryBaseDto } from '@/global/QueryBaseDto';
import { IsString } from 'class-validator';

export class QueryCommentDto extends QueryBaseDto {
  @Optional()
  @IsString()
  content: string;
}
