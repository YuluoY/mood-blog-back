import { resolve } from 'path';

export const AppConfig = {
  // 服务端配置
  server: {
    // 服务端口
    port: 3000,
    // 静态资源目录
    staticPath: resolve(__dirname, '../..', 'public'),
    // 默认头像
    defaultAvatar: `http://${process.env.HOST}:${process.env.PORT}/public/avatar.jpg`,
    // 默认封面
    defaultCover: `http://${process.env.HOST}:${process.env.PORT}/public/cover.jpg`,
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
    port: process.env.PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
    entities: [resolve(__dirname, '/**/*.entity{.ts,.js}')],
    synchronize: true, // 是否自动将实体类同步到数据库，生成环境下不建议使用
    retryDelay: 500, // 重试连接数据库的间隔
    retryAttempts: 1, // 重连的次数
    autoLoadEntities: true, // 自动加载实体，forFeature()方法注册的每个实体都将自动添加到配置对象的实体类中
    logging: true,
    timezone: 'Asia/Shanghai',
    maxQueryExecutionTime: 1
  },
  // 插件/第三方库的配置
  plugin: {
    svgCaptcha: {
      size: 4, // 验证码长度
      ignoreChars: '0o1i', // 验证码字符中排除 0o1i
      noise: 2, // 干扰线条的数量
      color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
      background: '#cc9966', // 验证码图片背景颜色
      width: 160, // width of captcha
      height: 30, // height of captcha
      fontSize: 50 // captcha text size
    },
    jwt: {
      secret: process.env.TOKEN_SECRET, // 设置用于签名 JWT 的秘钥，请根据实际情况更改
      signOptions: {
        expiresIn: process.env.TOKEN_EXPIRES_IN // 设置过期时间，单位为秒，可以根据实际需求调整
      }
    }
  }
};
