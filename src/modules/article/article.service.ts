import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';
import { I18nService } from 'nestjs-i18n';
import { UserService } from '../user/user.service';
import { QueryArticleDto } from '@/modules/article/dto/query-article.dto';

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

  async findAll() {
    return await this.articleManager.find({
      relations: ['user']
    });
  }
  async findOne(id: string) {
    const article = await this.articleManager.findOne({
      where: { id },
      relations: ['user']
    });
    if (!article) throw new HttpException(this.i18n.t('error.article.notExist'), HttpStatus.BAD_REQUEST);
    return article;
  }

  async update(id: string, updateArticleDto: UpdateArticleDto) {
    return await this.articleManager.update(id, updateArticleDto);
  }

  async remove(id: string | string[]) {
    return await this.articleManager.softDelete(id);
  }

  async restore(id: string | string[]) {
    return await this.articleManager.restore(id);
  }

  async pagination(page: number, limit: number, query: Partial<QueryArticleDto>) {
    // const [list, total] = await this.articleManager
    //   .createQueryBuilder('article')
    //   .leftJoinAndSelect('article.user', 'user')
    //   .where('article.title like :title', { title: `%${query.title}%` })
    //   .orderBy(`article.${query.sort}`, query.order)
    //   .skip((page - 1) * limit)
    //   .take(limit)
    //   .getManyAndCount();
    const [list, total] = await this.articleManager.findAndCount({
      where: { title: query.title },
      order: { [query.sort]: query.order },
      skip: (page - 1) * limit,
      take: limit,
      relations: ['user']
    });
    return {
      list,
      total,
      page: +page,
      limit: +limit
    };
  }
}
