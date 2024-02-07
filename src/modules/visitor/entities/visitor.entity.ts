import { Column, Entity } from 'typeorm';
import { EnumDatabaseTableName } from '@/types/core';
import { CustomBaseEntity } from '@/global/CustomBaseEntity';

@Entity(EnumDatabaseTableName.Visitor)
export class Visitor extends CustomBaseEntity {
  @Column({
    type: 'varchar',
    length: 50,
    comment: 'ip地址',
    nullable: true
  })
  ip: string;

  @Column({
    type: 'varchar',
    length: 100,
    comment: '浏览器',
    nullable: true
  })
  browser: string;

  @Column({
    type: 'varchar',
    length: 100,
    comment: '操作系统',
    nullable: true
  })
  os: string;

  @Column({
    type: 'varchar',
    length: 255,
    comment: '来源地址',
    nullable: true
  })
  address: string;

  @Column({
    type: 'varchar',
    length: 100,
    comment: '国家',
    nullable: true
  })
  country: string;

  @Column({
    type: 'varchar',
    length: 100,
    comment: '省份',
    nullable: true
  })
  province: string;

  @Column({
    type: 'varchar',
    length: 100,
    comment: '城市',
    nullable: true
  })
  city: string;

  @Column({
    type: 'varchar',
    length: 100,
    comment: '地区',
    nullable: true
  })
  district: string;

  @Column({
    type: 'varchar',
    length: 255,
    comment: '街道',
    nullable: true
  })
  street: string;

  @Column({
    type: 'jsonb',
    comment: '经度纬度'
  })
  point: {
    x: string;
    y: string;
  };

  @Column({
    type: 'varchar',
    length: 50,
    comment: '邮政编码',
    nullable: true
  })
  adcode: string;
}
