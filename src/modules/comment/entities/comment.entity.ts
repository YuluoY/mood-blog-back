import { CustomBaseEntity } from '@/global/CustomBaseEntity';
import { Article } from '@/modules/article/entities/article.entity';
import { EnumDatabaseTableName } from '@/types/core';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Like } from '@/modules/like/entities/like.entity';
import { User } from '@/modules/user/entities/user.entity';

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
