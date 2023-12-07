import { AppService } from '@/app.service';
import { AppConfig } from '@/config';
import { IS_PUBLIC_KEY } from '@/decorator/Public';
import { ExpressSessionPlus } from '@/types/core';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { randomBytes } from 'crypto';
import { Request } from 'express';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    private readonly appService?: AppService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ]);
    if (isPublic) return true;

    // const request = context.switchToHttp().getRequest();
    // const token = this.extractTokenFromHeader(request);
    // 从cookie中获取token
    const request = context.switchToHttp().getRequest<Request>();
    // 从session中获取csrfToken：登录时生成，每次请求都会更新
    const session = request.session as ExpressSessionPlus;
    if (!session.csrfToken) throw new UnauthorizedException();
    session.csrfToken = randomBytes(32).toString('hex');

    const token = this.appService.getCookie(request, process.env.COOKIE_TOKEN_NAME);
    // 判断token有效性
    if (!token) throw new UnauthorizedException();

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: AppConfig.plugin.jwt.secret
      });
      request['user'] = payload;
    } catch (error) {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
