import { forwardRef, Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { UserModule } from '@/modules/user/user.module';
import { ArticleModule } from '@/modules/article/article.module';
import { CommentModule } from '@/modules/comment/comment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from '@/modules/like/entities/like.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Like]),
    forwardRef(() => UserModule),
    forwardRef(() => ArticleModule),
    forwardRef(() => CommentModule)
  ],
  controllers: [LikeController],
  providers: [LikeService],
  exports: [LikeService]
})
export class LikeModule {}
