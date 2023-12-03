/*
 * @Author: yuluo 568055454@qq.com
 * @Date: 2023-12-04 00:46:30
 * @LastEditors: yuluo 568055454@qq.com
 * @LastEditTime: 2023-12-04 00:52:04
 * @FilePath: \mood-blog-back\src\plugin\SvgCaptcha.ts
 * @Description: 获取svg验证码
 *
 * Copyright (c) 2023 by 雨落, All Rights Reserved.
 */
import * as svgCaptcha from 'svg-captcha';

export const useSvgCaptcha = (
  options: svgCaptcha.ConfigObject
): {
  getCode: () => svgCaptcha.CaptchaObj;
} => {
  const defaultOptions: svgCaptcha.ConfigObject = {
    size: 4, // 验证码长度
    ignoreChars: '0o1i', // 验证码字符中排除 0o1i
    noise: 2, // 干扰线条的数量
    color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
    background: '#cc9966', // 验证码图片背景颜色
    width: 160, // width of captcha
    height: 30, // height of captcha
    fontSize: 50, // captcha text size
  };
  const optionsMerge = Object.assign(defaultOptions, options);
  return {
    getCode: () => svgCaptcha.create(optionsMerge),
  };
};
