import { QueryBaseDto } from '@/global/QueryBaseDto';
import { IsBooleanString } from 'class-validator';

export class QueryVisitorDto extends QueryBaseDto {
  @IsBooleanString()
  count?: boolean;
}
