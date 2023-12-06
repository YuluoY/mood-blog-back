export enum EnumStatus {
  Normal, // 正常
  Disabled, // 禁用
  Deleted, // 删除
  UnAudit // 审核中
}

export enum EnumRole {
  SuperAdmin = 'superAdmin', // 超级管理员
  Admin = 'admin', // 管理员
  User = 'user', // 普通用户
  VipUser = 'vipUser' // VIP用户
}

export interface ITokenUser {
  id: string;
  username: string;
  email: string;
  role: EnumRole;
  iat: number;
  exp: number;
  [key: string]: any;
}
