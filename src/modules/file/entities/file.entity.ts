import { CustomBaseEntity } from '@/entity/CustomBaseEntity';
import { Article } from '@/modules/article/entities/article.entity';
import { ManyToOne } from 'typeorm';

export class File extends CustomBaseEntity {
  @ManyToOne(() => Article, (Article) => Article.file)
  article: string;
}
