import { IsOptional, IsString } from 'class-validator';

export class CreateViewDto {
  @IsString()
  @IsOptional()
  userId: string;

  @IsString()
  @IsOptional()
  visitorId: string;

  @IsString()
  @IsOptional()
  articleId: string;
}
