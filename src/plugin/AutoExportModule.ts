/*
 * @Author: yuluo 568055454@qq.com
 * @Date: 2023-12-03 23:21:33
 * @LastEditors: yuluo 568055454@qq.com
 * @LastEditTime: 2023-12-04 00:38:49
 * @FilePath: \mood-blog-back\src\plugin\AutoExportModule.ts
 * @Description: 自动导出模块
 *
 * Copyright (c) 2023 by 雨落, All Rights Reserved.
 */

interface AutoExportModuleOptions {
  scanPath: string;
  reg: RegExp;
}

class AutoExportModule {
  private readonly scanPath: string;
  private readonly reg: RegExp;

  constructor(options: AutoExportModuleOptions) {
    this.scanPath = options.scanPath;
    this.reg = options.reg;
  }

  public async getModules(): Promise<any> {
    console.log(this.scanPath, this.reg);
    const modules = await import(this.scanPath);
    const keys = Object.keys(modules);
    const modulesMap = new Map();
    keys.forEach((key) => {
      if (this.reg.test(key)) {
        modulesMap.set(key, modules[key]);
      }
    });
    return modulesMap;
  }
}

export default AutoExportModule;
