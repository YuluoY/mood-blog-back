import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from './entities/like.entity';
import { UserService } from '@/modules/user/user.service';
import { ArticleService } from '@/modules/article/article.service';
import { CommentService } from '@/modules/comment/comment.service';
import { QueryLikeDto } from '@/modules/like/dto/query-like.dto';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private readonly likeManager: Repository<Like>,

    private readonly userService: UserService,
    private readonly articleService: ArticleService,
    private readonly commentService: CommentService
  ) {}

  async create(createLikeDto: CreateLikeDto) {
    try {
      return await this.likeManager.manager.transaction(async (manager) => {
        const { userId, articleId, commentId } = createLikeDto;
        const user = await this.userService.findOne({ id: userId });
        const article = await this.articleService.findOne({ id: articleId });
        const comment = await this.commentService.findOne({ id: commentId });
        const like = new Like();
        if (!user) throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
        like.user = user;
        if (article) like.article = article;
        if (comment) like.comment = comment;
        return await manager.save(like);
      });
    } catch (e) {
      throw new HttpException(e.message || e.toString(), HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    return await this.likeManager.find({
      relations: ['user', 'article', 'comment']
    });
  }

  async findOne(unique: Partial<QueryLikeDto>) {
    return await this.likeManager.findOne({
      where: unique,
      relations: ['user', 'article', 'comment']
    });
  }

  async update(id: string, updateLikeDto: Partial<UpdateLikeDto>) {
    try {
      return await this.likeManager.manager.transaction(async (manager) => {
        const user = await this.userService.findOne({ id: updateLikeDto.userId });
        if (!user) throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
        const like = new Like();
        like.user = user;
        if (updateLikeDto.articleId) {
          like.article = await this.articleService.findOne({ id: updateLikeDto.articleId });
        }
        if (updateLikeDto.commentId) {
          like.comment = await this.commentService.findOne({ id: updateLikeDto.commentId });
        }
        return await manager.update(Like, { id }, like);
      });
    } catch (e) {
      throw new HttpException(e.message || e.toString(), HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string | string[]) {
    return await this.likeManager.softDelete(id);
  }

  async restore(id: string | string[]) {
    return await this.likeManager.restore(id);
  }

  async pagination(page: number, limit: number, query: QueryLikeDto) {
    const [list, total] = await this.likeManager.findAndCount({
      where: query,
      relations: ['user', 'article', 'comment'],
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
