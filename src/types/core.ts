import { Session } from 'express-session';
import { Response } from 'express';
import { Hash } from 'crypto';
import { EnumRole } from './user';

export enum EnumDatabaseTableName {
  User = 'user',
  Article = 'article',
  Tag = 'tag',
  Category = 'category',
  Comment = 'comment',
  Role = 'role',
  Like = 'like',
  File = 'file',
  Router = 'router',
  View = 'view',
  Visitor = 'visitor'
}
export interface ExpressSessionPlus extends Session {
  code?: string;
  csrfToken?: string | Hash;
}

export interface IFindOneServiceOptions {
  refreshToken?: boolean;
  res?: Response;
  session?: ExpressSessionPlus;
}

export interface IUserSocializes {
  [key: string]: any;
}

/**
 * @description: 校验token后返回的对象
 */
export interface IParseToken {
  [key: string]: any;
  id: string;
  username: string;
  role: EnumRole;
}

export interface IBaiduMapPosition {
  address: string;
  content: {
    address_detail: {
      province: string;
      city: string;
      district: string;
      street: string;
      street_number: string;
      city_code: number;
      adcode: number;
    };
    address: string;
    point: {
      x: string;
      y: string;
    };
  };
  status: number;
}
