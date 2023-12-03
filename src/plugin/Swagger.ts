import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppConfig } from 'src/config';

// swagger使用
const options = new DocumentBuilder()
  // // 添加文档查看jwt校验
  .addBearerAuth()
  // 设置文档标题
  .setTitle(AppConfig.swagger.title)
  // 设置接口文档的描述
  .setDescription(AppConfig.swagger.desc)
  // 设置接口版本
  .setVersion(AppConfig.swagger.version)
  // 打包
  .build();

// 创建文档
// const document = SwaggerModule.createDocument(app, options);

// 安装，访问路径：http://localhost:3000/api-docs
// SwaggerModule.setup('api-docs', app, document);

export default {
  install: (app: NestExpressApplication) => {
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(AppConfig.swagger.url, app, document);
    console.log(
      `服务端Api接口文档已生成，访问地址：http://localhost:${AppConfig.server.port}/${AppConfig.swagger.url}`
    );
  },
};
