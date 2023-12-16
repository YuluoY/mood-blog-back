import { CustomBaseEntity } from '@/global/CustomBaseEntity';
import { Category } from '@/modules/category/entities/category.entity';
import { Comment } from '@/modules/comment/entities/comment.entity';
import { File } from '@/modules/file/entities/file.entity';
import { Like } from '@/modules/like/entities/like.entity';
import { User } from '@/modules/user/entities/user.entity';
import { View } from '@/modules/view/entities/view.entity';
import { EnumDatabaseTableName } from '@/types/core';
import { EnumStatus } from '@/types/user';
import { BeforeInsert, Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';

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
    default: EnumStatus.Normal // 0 正常 1 禁用 2 删除 3 审核
  })
  status: EnumStatus;

  @ManyToOne(() => User, { cascade: true })
  user: User;

  @OneToMany(() => View, (View) => View.article)
  view: number;

  @OneToMany(() => Like, (Like) => Like.article)
  like: number;

  @ManyToMany(() => Category, (Category) => Category.article)
  category: Category[];

  @OneToMany(() => Comment, (Comment) => Comment.article)
  comment: Comment[];

  // @OneToMany(() => File, (File) => File.article)
  // file: File[];

  @BeforeInsert()
  addPrefixToCover = () => {
    console.log(this.cover.indexOf('.myqcloud.com') !== -1, '-----asdasdasdasdasd');
    if (this.cover.lastIndexOf('.myqcloud.com') !== -1) {
      this.cover = `https://${this.cover}`;
    }
  };
}
