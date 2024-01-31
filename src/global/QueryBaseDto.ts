import { IsOptional } from 'class-validator';
import { Optional } from '@nestjs/common';

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

  @Optional()
  withDeleted: boolean;

  @Optional()
  relations?: string[];
}
