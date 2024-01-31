import { PartialType } from '@nestjs/swagger';
import { QueryBaseDto } from '@/global/QueryBaseDto';

export class QueryTagDto extends PartialType(QueryBaseDto) {}
