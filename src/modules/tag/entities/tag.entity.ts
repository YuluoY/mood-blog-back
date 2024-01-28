import { Column, Entity, ManyToMany } from 'typeorm';
import { EnumDatabaseTableName } from '@/types/core';
import { CustomBaseEntity } from '@/global/CustomBaseEntity';
import { Article } from '@/modules/article/entities/article.entity';

@Entity(EnumDatabaseTableName.Tag)
export class Tag extends CustomBaseEntity {
  @Column({
    type: 'varchar',
    length: 20,
    comment: '标签名称',
    nullable: false,
    unique: true
  })
  tagName: string;

  @Column({
    type: 'varchar',
    length: 20,
    comment: '标签颜色',
    nullable: true
  })
  tagColor: string;

  @ManyToMany(() => Article, (article) => article.tags)
  article: Article[];
}
