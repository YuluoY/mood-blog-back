import { CustomBaseEntity } from '@/global/CustomBaseEntity';
import { Article } from '@/modules/article/entities/article.entity';
import { EnumDatabaseTableName } from '@/types/core';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity(EnumDatabaseTableName.Comment)
export class Comment extends CustomBaseEntity {
  @ManyToOne(() => Article, (Article) => Article.comment)
  @JoinColumn({ name: 'articleId' })
  article: string;
}
