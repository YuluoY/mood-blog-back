import { IsOptional } from 'class-validator';

export class QueryUserDto {
  @IsOptional()
  id?: string;

  @IsOptional()
  username?: string;

  @IsOptional()
  email?: string;

  @IsOptional()
  phone?: string;
}
