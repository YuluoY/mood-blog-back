import { IsOptional, IsString, IsArray, IsNumber, IsBooleanString } from 'class-validator';

export class QueryFindManyOptions<T> {
  @IsOptional()
  @IsString()
  id: string;

  @IsOptional()
  createdAt: string | Date;

  @IsOptional()
  updatedAt: string | Date;

  @IsOptional()
  deletedAt: string | Date;

  @IsOptional()
  where: T;

  @IsOptional()
  @IsArray({ each: true, message: 'relations必须是数组' })
  relations: string[];

  @IsOptional()
  @IsString({ message: 'sort必须是ASC：升序，DESC：降序' })
  order: 'ASC' | 'DESC';

  @IsOptional()
  @IsNumber()
  skip: number;

  @IsOptional()
  @IsNumber()
  take: number;

  @IsOptional()
  @IsString()
  sort: string;

  @IsOptional()
  @IsBooleanString()
  withDeleted: boolean;
}
