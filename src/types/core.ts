import { Session } from 'express-session';
import { Response } from 'express';
import { Hash } from 'crypto';

export enum EnumDatabaseTableName {
  User = 'user',
  Article = 'article',
  Tag = 'tag',
  Category = 'category',
  Comment = 'comment',
  Role = 'role',
  Like = 'like',
  Router = 'router'
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
