import { CustomBaseEntity } from '@/global/CustomBaseEntity';
import { Article } from '@/modules/article/entities/article.entity';
import { EnumDatabaseTableName } from '@/types/core';
import { Column, Entity, ManyToMany } from 'typeorm';

@Entity(EnumDatabaseTableName.Category)
export class Category extends CustomBaseEntity {
  @Column({
    type: 'varchar',
    comment: '分类名称, 用于显示',
    length: 100,
    nullable: false,
    unique: true
  })
  cateName: string;

  @ManyToMany(() => Article, (Article) => Article.category, { cascade: true })
  article: Article[];
}
