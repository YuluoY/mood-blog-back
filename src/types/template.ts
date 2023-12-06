export interface IBaseTemplate<T> {
  code: number;
  data: T;
  success: boolean;
  message?: string;
}

export interface IPagination<T> {
  total: number;
  pageNum: number;
  pageSize: number;
  list: T;
}

export function Success<T>(data: T, message?: string, code: number = 200, success: boolean = true): IBaseTemplate<T> {
  return {
    code,
    data,
    success,
    message
  };
}

export function Fail<T = null>(
  code: number,
  message: string = '请求失败',
  data?: T,
  success: boolean = false
): IBaseTemplate<T> {
  return {
    code,
    message,
    data,
    success
  };
}
