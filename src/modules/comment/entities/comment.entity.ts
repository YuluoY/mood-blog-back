import { CustomBaseEntity } from '@/global/CustomBaseEntity';
import { Article } from '@/modules/article/entities/article.entity';
import { EnumDatabaseTableName } from '@/types/core';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Like } from '@/modules/like/entities/like.entity';
import { User } from '@/modules/user/entities/user.entity';
import { AppConfig } from '@/config';
import { Visitor } from '@/modules/visitor/entities/visitor.entity';

@Entity(EnumDatabaseTableName.Comment)
export class Comment extends CustomBaseEntity {
  @Column({
    type: 'text',
    comment: '评论内容',
    nullable: false
  })
  content: string;

  @Column({
    type: 'varchar',
    length: 255,
    comment: '昵称',
    default: '神秘人'
  })
  nickname: string;

  @Column({
    type: 'varchar',
    length: 20,
    comment: 'qq',
    default: ''
  })
  qq: string;

  @Column({
    type: 'varchar',
    length: 100,
    comment: '头像',
    default: AppConfig.server.defaultAvatar
  })
  avatar: string;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '邮箱',
    default: ''
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 100,
    comment: '网址',
    default: ''
  })
  website: string;

  @Column({
    type: 'boolean',
    comment: '是否订阅回复',
    default: false
  })
  isSubscribe: boolean;

  @Column({
    type: 'boolean',
    comment: '是否置顶',
    default: false
  })
  isTop: boolean;

  @ManyToOne(() => Visitor, { cascade: true })
  visitor: Visitor;

  @ManyToOne(() => User, { cascade: true })
  user: User;

  @ManyToOne(() => Article, (Article) => Article.comments)
  article: Article;

  @OneToMany(() => Like, (Like) => Like.comment, { cascade: true })
  likes: Like[];

  @ManyToOne(() => Comment, (Comment) => Comment.children)
  // eslint-disable-next-line no-use-before-define
  parent: Comment;

  @OneToMany(() => Comment, (Comment) => Comment.parent)
  // eslint-disable-next-line no-use-before-define
  children: Comment[];
}
