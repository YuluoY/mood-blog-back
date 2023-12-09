import { CustomBaseEntity } from '@/entity/CustomBaseEntity';
import { Article } from '@/modules/article/entities/article.entity';
import { JoinColumn, ManyToOne } from 'typeorm';

export class Comment extends CustomBaseEntity {
  @ManyToOne(() => Article, (Article) => Article.comment)
  @JoinColumn({ name: 'article_id' })
  article: string;
}
