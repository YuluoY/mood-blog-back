import { HttpException, HttpStatus, Injectable, Query } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { QueryCommentDto } from '@/modules/comment/dto/query-comment.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from '@/modules/comment/entities/comment.entity';
import { UserService } from '@/modules/user/user.service';
import { ArticleService } from '@/modules/article/article.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentManager: Repository<Comment>,

    private readonly userService: UserService,
    private readonly articleService: ArticleService
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    try {
      return await this.commentManager.manager.transaction(async (manager) => {
        const { userId, articleId, parentId } = createCommentDto;
        const user = await this.userService.findOne({ id: userId });
        const article = await this.articleService.findOne({ id: articleId });
        const parent = await this.findOne({ id: parentId });
        const comment = new Comment();
        if (!user) throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
        comment.user = user;
        if (article) comment.article = article;
        if (parent) {
          comment.parent = parent;
          // 找到父级的评论后将这个comment push到父级评论的children中
          comment.parent.children.push(comment);
        }
        return await manager.save(comment);
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
      return await this.commentManager.manager.transaction(async (manager) => {
        const user = await this.userService.findOne({ id: updateCommentDto.userId });
        if (!user) throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
        const comment = new Comment();
        comment.user = user;
        if (updateCommentDto.articleId) {
          comment.article = await this.articleService.findOne({ id: updateCommentDto.articleId });
        }
        if (updateCommentDto.parentId) {
          comment.parent = await this.findOne({ id: updateCommentDto.parentId });
          // 找到父级的评论后将这个comment push到父级评论的children中
          comment.parent.children.push(comment);
        }
        return await manager.update(Comment, id, comment);
      });
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
