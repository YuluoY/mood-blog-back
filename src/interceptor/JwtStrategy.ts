// jwt.strategy.ts
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AppConfig } from 'src/config';
import { UserService } from 'src/modules/user/user.servicec';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: AppConfig.plugin.jwt.secret // 设置用于签名 JWT 的秘钥，请根据实际情况更改
    });
  }

  async validate(payload: any) {
    // 这里你可以根据 payload 中的信息来进行用户的验证和查找
    // 例如，从数据库中查找用户信息并返回
    const user = await this.userService.findById(payload.id);

    if (!user) {
      throw new UnauthorizedException();
    }

    delete user.password;

    return user;
  }
}
