import { Module, forwardRef } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Article]), forwardRef(() => UserModule)],
  controllers: [ArticleController],
  providers: [ArticleService]
})
export class ArticleModule {}
