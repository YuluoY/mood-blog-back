import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as svgCaptcha from 'svg-captcha';
import { AppConfig } from './config';
import { CookieOptions, Request, Response } from 'express';

@Injectable()
export class AppService {
  constructor(private readonly jwtService?: JwtService) {}

  async generateToken(payload: any): Promise<string> {
    return await this.jwtService.signAsync(payload);
  }

  getCode(options?: svgCaptcha.ConfigObject): svgCaptcha.CaptchaObj {
    const defaultOptions = AppConfig.plugin.svgCaptcha;
    const optionsMerge = Object.assign(defaultOptions, options);
    const captcha = svgCaptcha.create(optionsMerge);
    console.log(captcha.text);
    return captcha;
  }

  setCookie(res: Response, key: string, value: string, options?: CookieOptions) {
    res.cookie(key, value, options);
  }

  getCookie(req: Request, key: string) {
    return req.cookies[key];
  }
}
