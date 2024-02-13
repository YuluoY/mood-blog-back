import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from '@/modules/comment/entities/comment.entity';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [CommentService]
})
export class CommentModule {}
