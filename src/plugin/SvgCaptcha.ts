/*
 * @Author: yuluo 568055454@qq.com
 * @Date: 2023-12-04 00:46:30
 * @LastEditors: yuluo 568055454@qq.com
 * @LastEditTime: 2023-12-04 23:35:20
 * @FilePath: \mood-blog-back\src\plugin\SvgCaptcha.ts
 * @Description: 获取svg验证码
 *
 * Copyright (c) 2023 by 雨落, All Rights Reserved.
 */
import { AppConfig } from 'src/config';
import * as svgCaptcha from 'svg-captcha';

export const useSvgCaptcha = (
  options: svgCaptcha.ConfigObject
): {
  getCode: () => svgCaptcha.CaptchaObj;
} => {
  const defaultOptions: svgCaptcha.ConfigObject = AppConfig.plugin.svgCaptcha;
  const optionsMerge = Object.assign(defaultOptions, options);
  return {
    getCode: () => svgCaptcha.create(optionsMerge)
  };
};
