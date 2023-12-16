import { CustomBaseEntity } from '@/global/CustomBaseEntity';

export class QueryBaseDto extends CustomBaseEntity {
  sort: string = 'updatedAt';
  order: 'ASC' | 'DESC' = 'DESC';
}
