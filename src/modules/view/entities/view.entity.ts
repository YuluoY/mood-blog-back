import { CustomBaseEntity } from '@/entity/CustomBaseEntity';
import { Article } from '@/modules/article/entities/article.entity';
import { JoinColumn, ManyToOne } from 'typeorm';

export class View extends CustomBaseEntity {
  @ManyToOne(() => Article)
  @JoinColumn({ name: 'article_id' })
  article: string;
}
