import { HttpException, HttpStatus, Injectable, Query } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { QueryCommentDto } from '@/modules/comment/dto/query-comment.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from '@/modules/comment/entities/comment.entity';
import { User } from '@/modules/user/entities/user.entity';
import { Visitor } from '@/modules/visitor/entities/visitor.entity';
import { Article } from '@/modules/article/entities/article.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentManager: Repository<Comment>
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    try {
      return await this.commentManager.manager.transaction(async (manager) => {
        const { user, article, parent, visitor } = createCommentDto;
        const $Comment = manager.create(Comment);
        Object.assign($Comment, createCommentDto);
        if (user && user.id) {
          $Comment.user = await manager.findOne(User, { where: { id: user.id } });
        }
        if (visitor && visitor.id) {
          $Comment.visitor = await manager.findOne(Visitor, { where: { id: visitor.id } });
        }
        if (article && article.id) {
          $Comment.article = await manager.findOne(Article, { where: { id: article.id } });
        }
        if (parent && parent.id) {
          $Comment.parent = await manager.findOne(Comment, { where: { id: parent.id } });
          // 找到父级的评论后将这个comment push到父级评论的children中
          $Comment.parent.children.push($Comment);
        }
        console.log($Comment);
        return await manager.save($Comment);
      });
    } catch (e) {
      throw new HttpException(e.message || e.toString(), HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    return await this.commentManager.find({
      relations: ['user', 'article']
    });
  }

  async findOne(unique: Partial<QueryCommentDto>) {
    return await this.commentManager.findOne({
      where: unique,
      relations: ['user', 'article']
    });
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    try {
      return await this.commentManager.manager.transaction(async (manager) => {});
    } catch (e) {
      throw new HttpException(e.message || e.toString(), HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string | string[]) {
    return await this.commentManager.softDelete(id);
  }

  async restore(id: string | string[]) {
    return await this.commentManager.restore(id);
  }

  async pagination(page: number, limit: number, query: QueryCommentDto) {
    const [list, total] = await this.commentManager.findAndCount({
      where: query,
      relations: ['user', 'article'],
      take: limit,
      skip: (page - 1) * limit
    });
    return {
      list,
      total,
      page: +page,
      limit: +limit
    };
  }
}
