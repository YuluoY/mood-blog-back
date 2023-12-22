import { JwtModuleOptions } from '@nestjs/jwt';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SessionOptions } from 'express-session';
import { AcceptLanguageResolver, I18nOptions, QueryResolver } from 'nestjs-i18n';
import { join, resolve } from 'path';
import * as svgCaptcha from 'svg-captcha';
import * as COS from 'cos-nodejs-sdk-v5';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import * as multer from 'multer';
import { Request } from 'express';
import * as process from 'process';

export interface IAppConfigPlugin {
  svgCaptcha: svgCaptcha.ConfigObject;
  jwt: JwtModuleOptions;
  session: SessionOptions;
  i18n: I18nOptions;
  cos: COS.COSOptions;
  multer: MulterOptions;
}

export interface IAppConfigServer {
  port: number;
  staticPath: string;
  defaultAvatar: string;
  defaultCover: string;
  defaultBio: string;
}

export interface IAppConfigSwagger {
  title: string;
  desc: string;
  version: string;
  url: string;
  isAuth: boolean;
}

export interface IAppConfig {
  server: IAppConfigServer;
  swagger: IAppConfigSwagger;
  orm: TypeOrmModuleOptions;
  plugin: IAppConfigPlugin;
}
export const AppConfig: IAppConfig = {
  // 服务端配置
  server: {
    // 服务端口
    port: 3000,
    // 静态资源目录
    staticPath: resolve(__dirname, '../..', 'public'),
    // 默认头像
    defaultAvatar: `//${process.env.HOST}:3000/avatar.png`,
    // 默认封面
    defaultCover: `//${process.env.HOST}:3000/cover.png`,
    // 默认简介
    defaultBio: '这个人很懒，什么都没有留下'
  },
  // swagger配置
  swagger: {
    title: 'mood-blog-back服务端Api接口文档',
    desc: '此站点记录着博客服务端所有的Api接口',
    version: '1',
    url: 'api-docs',
    isAuth: true
  },
  // 数据库配置
  orm: {
    type: 'postgres',
    host: process.env.HOST,
    port: Number(process.env.PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
    entities: [join(__dirname, '..', '/modules/**/*.entity{.ts,.js}')],
    synchronize: true,
    retryDelay: 500,
    retryAttempts: 1,
    autoLoadEntities: true,
    logging: true,
    // logger: new CustomLogger(),
    // timezone: 'Asia/Shanghai',
    maxQueryExecutionTime: 1
  },
  // 插件/第三方库的配置
  plugin: {
    session: {
      // session配置
      secret: 'huyongle,2023-11-27',
      rolling: true,
      name: 'captcha.sid',
      cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
      resave: false
    },
    i18n: {
      // 国际化配置
      fallbackLanguage: 'zh',
      loaderOptions: {
        path: resolve(__dirname, '..', 'i18n'),
        watch: true
      },
      resolvers: [{ use: QueryResolver, options: ['lang'] }, AcceptLanguageResolver]
    },
    svgCaptcha: {
      // 验证码配置
      size: 4,
      ignoreChars: '0o1i',
      noise: 0,
      color: true,
      background: '#cc9966',
      width: 100,
      height: 30,
      fontSize: 30 // captcha text size
    },
    jwt: {
      // jwt配置
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES_IN
      }
    },
    cos: {
      // 腾讯云对象存储配置
      SecretId: process.env.COS_SECRET_ID,
      SecretKey: process.env.COS_SECRET_KEY
    },
    multer: {
      // 本地文件上传配置
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          // 上传文件的目录 保证项目根目录中public/uploads文件夹存在
          let path = '/images';
          if (file.mimetype.includes('video')) {
            path = '/videos';
          } else if (file.mimetype.includes('audio')) {
            path = '/audios';
          }
          cb(null, join(__dirname, '../..', `public/${path}`));
        },
        filename: (req, file, cb) => {
          const filename = `${Date.now()}-${file.originalname}`;
          const prefix = file.mimetype.includes('video')
            ? 'video'
            : file.mimetype.includes('audio')
              ? 'audio'
              : 'images';
          req.body.filePath = `//${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/${prefix}/${filename}`;
          req.body.localPath = join(__dirname, '../..', `public/${prefix}/${filename}`);
          // 上传文件的文件名称
          cb(null, filename);
        }
      })
    }
  }
};
