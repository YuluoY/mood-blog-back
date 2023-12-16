import { IsOptional } from 'class-validator';
import { QueryBaseDto } from '@/global/QueryBaseDto';

export class QueryUserDto extends QueryBaseDto {
  @IsOptional()
  username: string;

  @IsOptional()
  email: string;

  @IsOptional()
  phone: string;

  @IsOptional()
  password: string;
}
