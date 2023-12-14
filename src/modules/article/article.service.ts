import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';
import { I18nService } from 'nestjs-i18n';
import { UserService } from '../user/user.service';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleManager: Repository<Article>,
    private readonly i18n: I18nService,
    private readonly userService: UserService
  ) {}

  async create(createArticleDto: CreateArticleDto, userId: string) {
    try {
      return await this.articleManager.manager.transaction(async (manager) => {
        const isExistArticle = await manager.findOne(Article, {
          where: { title: createArticleDto.title }
        });
        if (isExistArticle) throw new HttpException(this.i18n.t('error.article.titleRepeat'), HttpStatus.BAD_REQUEST);
        createArticleDto.user = await this.userService.findOne({ id: userId });
        await manager.save(Article, createArticleDto);
        return this.i18n.t('success.article.addSuccess');
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  findAll() {
    return `This action returns all article`;
  }

  findOne(id: number) {
    return `This action returns a #${id} article`;
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
