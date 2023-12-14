import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as svgCaptcha from 'svg-captcha';
import { AppConfig } from './config';
import { CookieOptions, Request, Response } from 'express';
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

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
    const cookiesStr = req.headers.cookie;
    if (!cookiesStr) return;
    const cookies = cookiesStr.split(';');
    const cookie = cookies.find((item) => item.includes(key));
    if (!cookie) return;
    const value = cookie.split('=');
    return value[1];
  }

  encrypt(data: string, secretKey: string) {
    const iv = randomBytes(16); // 生成随机的初始化向量
    const cipher = createCipheriv('aes-256-cbc', Buffer.from(secretKey), iv);
    let encryptedData = cipher.update(data, 'utf-8', 'hex');
    encryptedData += cipher.final('hex');
    return { iv: iv.toString('hex'), encryptedData };
  }

  decrypt(encryptedData: string, secretKey: string, iv: string) {
    const decipher = createDecipheriv('aes-256-cbc', Buffer.from(secretKey), Buffer.from(iv, 'hex'));
    let decryptedData = decipher.update(encryptedData, 'hex', 'utf-8');
    decryptedData += decipher.final('utf-8');
    return decryptedData;
  }
}
