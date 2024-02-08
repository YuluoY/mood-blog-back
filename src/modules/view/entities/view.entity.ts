import { CustomBaseEntity } from '@/global/CustomBaseEntity';
import { Article } from '@/modules/article/entities/article.entity';
import { EnumDatabaseTableName } from '@/types/core';
import { Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { User } from '@/modules/user/entities/user.entity';
import { Visitor } from '@/modules/visitor/entities/visitor.entity';

@Entity(EnumDatabaseTableName.View)
export class View extends CustomBaseEntity {
  @OneToOne(() => User, { nullable: true })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Visitor, { nullable: true })
  @JoinColumn()
  visitor: Visitor;

  @ManyToOne(() => Article, (Article) => Article.views, { nullable: true })
  article: Article;
}
