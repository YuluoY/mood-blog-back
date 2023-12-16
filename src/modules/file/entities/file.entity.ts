import { CustomBaseEntity } from '@/global/CustomBaseEntity';
import { User } from '@/modules/user/entities/user.entity';
import { EnumDatabaseTableName } from '@/types/core';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity(EnumDatabaseTableName.File)
export class File extends CustomBaseEntity {
  @ManyToOne(() => User)
  user: User;

  @Column({
    type: 'varchar',
    length: 20,
    comment: '文件字段名称',
    nullable: true
  })
  fieldname: string;

  @Column({
    type: 'varchar',
    length: 1024,
    comment: '文件来源名称',
    nullable: false
  })
  originalname: string;

  @Column({
    type: 'varchar',
    length: 20,
    comment: '文件编码',
    nullable: true
  })
  encoding: string;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '文件类型',
    nullable: true
  })
  mimetype: string;

  @Column({
    type: 'varchar',
    length: 255,
    comment: '文件大小',
    nullable: true
  })
  size: string;

  @Column({
    type: 'varchar',
    length: 255,
    comment: '文件的访问路径',
    nullable: false
  })
  url: string;

  @Column({
    type: 'varchar',
    length: 255,
    comment: 'cos存储的位置',
    nullable: false
  })
  key: string;

  @Column({
    type: 'varchar',
    length: 150,
    comment: 'cos存储的桶名称',
    nullable: false
  })
  bucket: string;
}
