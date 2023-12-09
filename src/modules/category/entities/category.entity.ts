import { CustomBaseEntity } from '@/entity/CustomBaseEntity';
import { Article } from '@/modules/article/entities/article.entity';
import { JoinColumn, ManyToMany } from 'typeorm';

export class Category extends CustomBaseEntity {
  @ManyToMany(() => Article, (Article) => Article.category)
  @JoinColumn({ name: 'article_ids' })
  article: string[];
}
