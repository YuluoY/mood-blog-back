import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import type { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { YRoles } from 'src/types/core';

// 定义局部的请求守卫，权限校验
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private ReflectorX: Reflector) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.ReflectorX.get<YRoles[]>('role', context.getHandler());

    const req = context.switchToHttp().getRequest<Request>();
    const { role } = req.query as { role: YRoles };

    if (roles && !roles.includes(role)) return false;
    return true;
  }
}
