import { CustomBaseEntity } from '@/entity/CustomBaseEntity';
import { Article } from '@/modules/article/entities/article.entity';
import { EnumDatabaseTableName } from '@/types/core';
import { Column, Entity, JoinColumn, ManyToMany } from 'typeorm';

@Entity(EnumDatabaseTableName.Category)
export class Category extends CustomBaseEntity {
  @Column({
    type: 'varchar',
    comment: '分类名称',
    length: 100,
    nullable: false,
    unique: true
  })
  name: string;

  @ManyToMany(() => Article, (Article) => Article.category)
  article: string;
}
