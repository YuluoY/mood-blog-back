import { CustomBaseEntity } from '@/global/CustomBaseEntity';
import { Article } from '@/modules/article/entities/article.entity';
import { EnumDatabaseTableName } from '@/types/core';
import { Entity, ManyToOne } from 'typeorm';
import { User } from '@/modules/user/entities/user.entity';
import { Comment } from '@/modules/comment/entities/comment.entity';

@Entity(EnumDatabaseTableName.Like)
export class Like extends CustomBaseEntity {
  @ManyToOne(() => Article, (Article) => Article.likes)
  article: Article;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Comment, (Comment) => Comment.likes)
  comment: Comment;
}
