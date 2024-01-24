import { PartialType } from '@nestjs/swagger';
import { CreateTagDto } from './create-tag.dto';
import { IsOptional } from 'class-validator';

export class UpdateTagDto extends PartialType(CreateTagDto) {
  withDeleted?: boolean;
}
