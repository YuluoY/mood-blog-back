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
