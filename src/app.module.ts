import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfig } from './config';
import modules from './modules';
import { JwtModule } from '@nestjs/jwt';
import { I18nModule } from 'nestjs-i18n';
import { ArticleModule } from './modules/article/article.module';
import { LikeModule } from './modules/like/like.module';
import { CommentModule } from './modules/comment/comment.module';
import { CategoryModule } from './modules/category/category.module';
import { FavoriteModule } from './modules/favorite/favorite.module';
import { FileModule } from './modules/file/file.module';
import { ShareModule } from './modules/share/share.module';
import { ViewModule } from './modules/view/view.module';
import { FriendModule } from './modules/friend/friend.module';

@Module({
  imports: [
    ...modules,
    TypeOrmModule.forRoot(AppConfig.orm),
    I18nModule.forRoot(AppConfig.plugin.i18n),
    JwtModule.register(AppConfig.plugin.jwt),
    ArticleModule,
    LikeModule,
    CommentModule,
    CategoryModule,
    FavoriteModule,
    FileModule,
    ShareModule,
    ViewModule,
    FriendModule
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService]
})
export class AppModule {}
