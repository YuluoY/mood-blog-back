import { Session } from 'express-session';

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
  code: string;
}
