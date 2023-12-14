import { AppConfig } from 'src/config';
import { CustomBaseEntity } from '@/entity/CustomBaseEntity';
import { EnumDatabaseTableName, IUserSocializes } from 'src/types/core';
import { EnumRole, EnumStatus } from 'src/types/user';
import { Column, Entity, Index } from 'typeorm';

@Entity(EnumDatabaseTableName.User)
export class User extends CustomBaseEntity {
  @Column({
    type: 'varchar',
    comment: '用户名',
    unique: true,
    nullable: true
  })
  @Index()
  username?: string;

  @Column({
    type: 'varchar',
    select: false,
    comment: '密码',
    nullable: false
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 100,
    comment: '邮箱',
    nullable: false,
    unique: true
  })
  @Index()
  email?: string;

  @Column({
    type: 'varchar',
    comment: '昵称',
    nullable: true
  })
  nickname?: string;

  @Column({
    type: 'varchar',
    length: 11,
    comment: '手机号',
    nullable: true
  })
  phone?: string;

  @Column({
    type: 'varchar',
    length: 150,
    comment: '头像',
    nullable: true,
    default: AppConfig.server.defaultAvatar
  })
  avatar?: string;

  @Column({
    type: 'varchar',
    length: 150,
    comment: '封面',
    nullable: true,
    default: AppConfig.server.defaultCover
  })
  cover?: string;

  @Column({
    type: 'enum',
    enum: EnumStatus,
    comment: '用户状态',
    default: EnumStatus.Normal
  })
  status?: EnumStatus;

  @Column({
    type: 'text',
    comment: '个人简介',
    default: AppConfig.server.defaultBio
  })
  bio?: string;

  @Column({
    type: 'enum',
    enum: EnumRole,
    comment: '用户角色',
    default: EnumRole.User
  })
  role?: EnumRole;

  @Column({
    type: 'jsonb',
    comment: '社交网站',
    nullable: true
  })
  socializes?: IUserSocializes[];

  @Column({
    type: 'varchar',
    length: 200,
    comment: '所在地',
    nullable: true
  })
  location?: string;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '注册ip',
    nullable: true
  })
  ip?: string;

  @Column({
    type: 'varchar',
    length: 200,
    comment: '浏览器信息',
    nullable: true
  })
  userAgent?: string;

  @Column({
    type: 'text',
    comment: '用户权限',
    select: false,
    nullable: true
  })
  token?: string;

  @Column({
    type: 'timestamp',
    comment: '最后登录时间',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP'
  })
  lastLoginAt?: Date | null;
}
