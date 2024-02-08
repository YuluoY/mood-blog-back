import { AppService } from '@/app.service';
import { AppConfig } from '@/config';
import { IS_PUBLIC_KEY } from '@/decorator/Public';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    private readonly appService: AppService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest<Request>();

    // 获取csrfToken，防止csrf攻击
    this.verifyCsrfToken(request.headers['x-csrf-token'] as string);

    // 获取token，验证用户身份
    const token = this.appService.getCookie(request, process.env.JWT_COOKIE_NAME);
    await this.verifyToken(token, request);

    return true;
  }

  private verifyCsrfToken(csrfToken: string): void {
    if (!csrfToken) throw new UnauthorizedException();
    const [encryptedData, iv] = csrfToken.split('-');
    if (this.appService.decrypt(encryptedData, process.env.CSRF_TOKEN_SECRET, iv) !== 'true')
      throw new UnauthorizedException();
  }

  private async verifyToken(token: string, request: Request): Promise<void> {
    if (!token) throw new UnauthorizedException();
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: AppConfig.plugin.jwt.secret
      });
      request['user'] = payload;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
