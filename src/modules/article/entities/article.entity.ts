import { CustomBaseEntity } from '@/global/CustomBaseEntity';
import { Category } from '@/modules/category/entities/category.entity';
import { Comment } from '@/modules/comment/entities/comment.entity';
import { Like } from '@/modules/like/entities/like.entity';
import { User } from '@/modules/user/entities/user.entity';
import { View } from '@/modules/view/entities/view.entity';
import { EnumDatabaseTableName } from '@/types/core';
import { EnumStatus } from '@/types/user';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';

@Entity(EnumDatabaseTableName.Article)
export class Article extends CustomBaseEntity {
  @Column({
    type: 'varchar',
    comment: '文章标题',
    length: 255,
    nullable: false,
    unique: true
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

  @Column({
    type: 'enum',
    enum: EnumStatus,
    comment: '文章状态',
    default: EnumStatus.Normal // 0 正常 1 禁用 2 删除 3 审核 4 私密 5 密码保护 6 草稿
  })
  status: EnumStatus;

  @Column({
    type: 'int',
    comment: '文字内容字数',
    default: 0
  })
  words: number;

  @Column({
    type: 'boolean',
    comment: '是否置顶',
    default: false
  })
  isTop: boolean;

  @Column({
    type: 'boolean',
    comment: '是否推荐',
    default: false
  })
  isRecommend: boolean;

  @ManyToOne(() => User, { cascade: true })
  user: User;

  @OneToMany(() => View, (View) => View.article, { cascade: true })
  views: View[];

  @OneToMany(() => Like, (Like) => Like.article, { cascade: true })
  likes: Like[];

  @ManyToMany(() => Category, (Category) => Category.article)
  @JoinTable()
  category: Category[];

  @OneToMany(() => Comment, (Comment) => Comment.article)
  comments: Comment[];

  // @OneToMany(() => File, (File) => File.article)
  // file: File[];
}
