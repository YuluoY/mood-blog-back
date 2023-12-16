import { IsOptional } from 'class-validator';

export class QueryBaseDto {
  @IsOptional()
  id: string;

  @IsOptional()
  createdAt: Date;

  @IsOptional()
  updatedAt: Date;

  @IsOptional()
  deletedAt: Date;

  @IsOptional()
  sort: string = 'updatedAt';

  @IsOptional()
  order: 'ASC' | 'DESC' = 'DESC';
}
