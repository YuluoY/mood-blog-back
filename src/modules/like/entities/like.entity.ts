import { CustomBaseEntity } from '@/global/CustomBaseEntity';
import { Article } from '@/modules/article/entities/article.entity';
import { EnumDatabaseTableName } from '@/types/core';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity(EnumDatabaseTableName.Like)
export class Like extends CustomBaseEntity {
  @ManyToOne(() => Article, (Article) => Article.like)
  @JoinColumn({ name: 'articleId' })
  article: string;
}
