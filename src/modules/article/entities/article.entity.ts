import { CustomBaseEntity } from '@/entity/CustomBaseEntity';
import { Category } from '@/modules/category/entities/category.entity';
import { Comment } from '@/modules/comment/entities/comment.entity';
import { File } from '@/modules/file/entities/file.entity';
import { Like } from '@/modules/like/entities/like.entity';
import { User } from '@/modules/user/entities/user.entity';
import { View } from '@/modules/view/entities/view.entity';
import { EnumDatabaseTableName } from '@/types/core';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany } from 'typeorm';

@Entity(EnumDatabaseTableName.Article)
export class Article extends CustomBaseEntity {
  @Column({
    type: 'varchar',
    comment: '文章标题',
    length: 255,
    nullable: false
  })
  title: string;

  @Column({
    type: 'text',
    comment: '文章内容',
    nullable: false
  })
  content: string;

  @Column({
    type: 'varchar',
    comment: '文章封面',
    length: 200,
    nullable: true
  })
  cover: string;

  @Column({
    type: 'text',
    comment: '文章描述',
    nullable: true
  })
  description: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => View, (View) => View.article)
  view: View[];

  @OneToMany(() => Like, (Like) => Like.article)
  like: Like[];

  @ManyToMany(() => Category, (Category) => Category.article)
  category: Category[];

  @OneToMany(() => Comment, (Comment) => Comment.article)
  comment: Comment[];

  @OneToMany(() => File, (File) => File.article)
  file: File[];
}
