import { forwardRef, Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '@/modules/category/entities/category.entity';
import { ArticleModule } from '@/modules/article/article.module';

@Module({
  imports: [TypeOrmModule.forFeature([Category]), forwardRef(() => ArticleModule)],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService]
})
export class CategoryModule {}
