import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as svgCaptcha from 'svg-captcha';
import { AppConfig } from './config';

@Injectable()
export class AppService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(payload: any): Promise<string> {
    return await this.jwtService.signAsync(payload);
  }

  getCode(options: svgCaptcha.ConfigObject): svgCaptcha.CaptchaObj {
    const defaultOptions = AppConfig.plugin.svgCaptcha;
    const optionsMerge = Object.assign(defaultOptions, options);
    const captcha = svgCaptcha.create(optionsMerge);
    return captcha;
  }
}
