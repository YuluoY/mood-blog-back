import { resolve } from 'path';

export const AppConfig = {
  // 服务端配置
  server: {
    port: 3000,
    staticPath: resolve(__dirname, '../..', 'public'),  // 静态资源目录
  },
  // swagger配置
  swagger: {
    title: 'mood-blog-back服务端Api接口文档',
    desc: '此站点记录着博客服务端所有的Api接口',
    version: '1',
    url: 'api-docs',
    isAuth: true,
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
    maxQueryExecutionTime: 1
  },
};
