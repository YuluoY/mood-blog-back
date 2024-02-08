import { IsIP, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateVisitorDto {
  @IsIP()
  ip: string;

  @IsString()
  @IsOptional()
  browser: string;

  @IsString()
  @IsOptional()
  windowsOS: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsOptional()
  country: string;

  @IsString()
  @IsOptional()
  province: string;

  @IsString()
  @IsOptional()
  city: string;

  @IsString()
  @IsOptional()
  district: string;

  @IsString()
  @IsOptional()
  street: string;

  @IsOptional()
  point: {
    x: string;
    y: string;
  };

  @IsOptional()
  adcode: string;

  @IsNumber()
  @IsOptional()
  count: number;
}
