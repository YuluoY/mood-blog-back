import { forwardRef, Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { UserModule } from '@/modules/user/user.module';
import { ArticleModule } from '@/modules/article/article.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from '@/modules/comment/entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), forwardRef(() => UserModule), forwardRef(() => ArticleModule)],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [CommentService]
})
export class CommentModule {}
