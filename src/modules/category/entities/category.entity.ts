import { CustomBaseEntity } from '@/global/CustomBaseEntity';
import { Article } from '@/modules/article/entities/article.entity';
import { EnumDatabaseTableName } from '@/types/core';
import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';

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

  @Column({
    type: 'varchar',
    comment: '分类别名, 用于url',
    length: 100,
    nullable: false,
    unique: true
  })
  cateAlias: string;

  @Column({
    type: 'varchar',
    comment: '分类颜色',
    length: 20,
    nullable: true,
    default: '#000000'
  })
  cateColor: string;

  @OneToMany(() => Article, (Article) => Article.category, { cascade: true })
  article: Article[];
}
