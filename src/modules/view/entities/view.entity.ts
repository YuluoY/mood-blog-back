import { CustomBaseEntity } from '@/global/CustomBaseEntity';
import { Article } from '@/modules/article/entities/article.entity';
import { EnumDatabaseTableName } from '@/types/core';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity(EnumDatabaseTableName.View)
export class View extends CustomBaseEntity {
  @ManyToOne(() => Article, (Article) => Article.views)
  article: Article;
}
