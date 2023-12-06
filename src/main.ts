import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cors from 'cors';
import Swagger from './plugin/Swagger';
import { HttpFilter } from './common/HttpFilter';
import { Response } from './common/Response';
import { ValidationPipe } from '@nestjs/common';
import { RoleGuard } from './common/Role.guard';
import { AppConfig } from './config';
import { AuthGuard } from './common/Auth.guard';
import { JwtService } from '@nestjs/jwt';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // session 验证码注入
  app.use(session(AppConfig.plugin.session));

  // 跨域
  app.use(cors());

  // 使用静态目录。src/public下的所有文件都可以直接访问
  app.useStaticAssets(AppConfig.server.staticPath);

  // 全局注册异常过滤器
  app.useGlobalFilters(new HttpFilter());

  // 全局注册响应拦截器
  app.useGlobalInterceptors(new Response());

  // 全局校验管道
  app.useGlobalPipes(new ValidationPipe());

  // 全局权限守卫
  // new AuthGuard(new JwtService(), new Reflector())
  app.useGlobalGuards(new AuthGuard(new JwtService(), new Reflector()), new RoleGuard(new Reflector()));

  // 接口文档生成
  Swagger.install(app);

  await app.listen(3000);
}
bootstrap();
