import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as svgCaptcha from 'svg-captcha';
import { AppConfig } from './config';
import { CookieOptions, Request, Response } from 'express';
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';
import { EntityManager, EntityTarget, FindManyOptions } from 'typeorm';
import { IBaiduMapPosition } from '@/types/core';

@Injectable()
export class AppService {
  private readonly entityManager: EntityManager;
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

  async pagination<T>(
    pageNum: number,
    pageSize: number,
    entity: EntityTarget<T>,
    options?: FindManyOptions
  ): Promise<any> {
    options = Object.assign(options, { skip: (pageNum - 1) * pageSize, take: pageSize });
    return await this.entityManager.findAndCount(entity, options);
  }

  async getPosition(ip: string) {
    return new Promise((resolve, reject) => {
      const https = require('https');
      const ak = 'goRxJfxb85Ewkz3LN35FuKLhu9bQARcc';
      const url = `https://api.map.baidu.com/location/ip?ip=${ip}&ak=${ak}`;
      https
        .get(url, (res: any) => {
          let data = '';
          res.on('data', (chunk: any) => {
            data += chunk;
          });
          res.on('end', () => {
            const pos = JSON.parse(data || '{}') as IBaiduMapPosition;
            const res = {
              address: pos?.address,
              country: '',
              province: pos?.content?.address_detail?.province,
              city: pos?.content?.address_detail?.city,
              district: pos?.content?.address_detail?.district,
              street: pos?.content?.address_detail?.street,
              point: pos?.content?.point,
              adcode: pos?.content?.address_detail?.adcode
            };
            if (res.address) {
              res.country = res.address.split('|')[0];
            }
            resolve(res);
          });
        })
        .on('error', (err: any) => {
          reject(err);
        });
    });
  }
}
