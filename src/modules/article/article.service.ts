import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { EntityManager, Repository } from 'typeorm';
import { I18nService } from 'nestjs-i18n';
import { UserService } from '../user/user.service';
import { QueryArticleDto } from '@/modules/article/dto/query-article.dto';
import { Like } from '@/modules/like/entities/like.entity';
import { View } from 'typeorm/schema-builder/view/View';
import { Comment } from '@/modules/comment/entities/comment.entity';
import { Category } from '@/modules/category/entities/category.entity';
import { EnumStatus } from '@/types/user';
import { Tag } from '@/modules/tag/entities/tag.entity';
import { TagService } from '@/modules/tag/tag.service';
import { User } from '@/modules/user/entities/user.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleManager: Repository<Article>,
    private readonly i18n: I18nService,
    private readonly userService: UserService
  ) {}

  async create(createArticleDto: Partial<CreateArticleDto>, userId: string) {
    try {
      return await this.articleManager.manager.transaction(async (manager) => {
        const isExistArticle = await manager.findOne(Article, {
          where: { title: createArticleDto.title }
        });
        if (isExistArticle) throw new HttpException(this.i18n.t('error.article.titleRepeat'), HttpStatus.BAD_REQUEST);
        // 标签的处理
        const newTags: Tag[] = [];
        for (let i = 0; i < createArticleDto.tags.length; i++) {
          const tag = createArticleDto.tags[i];
          if (typeof tag === 'string') {
            const isExistTag = await manager.findOne(Tag, { where: { tagName: tag } });
            if (isExistTag) {
              createArticleDto.tags[i] = isExistTag;
            } else {
              const newTag = manager.create(Tag, { tagName: tag });
              newTags.push(newTag);
              createArticleDto.tags[i] = newTag;
            }
          }
        }
        if (newTags.length) {
          await manager.save(Tag, newTags);
        }
        const article = manager.create(Article, createArticleDto);
        article.user = await manager.findOne(User, { where: { id: userId } });
        await manager.save(Article, article);
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
  async findOne(data: Partial<QueryArticleDto>) {
    const article = await this.articleManager.findOne({
      where: data,
      relations: ['user']
    });
    if (!article) throw new HttpException(this.i18n.t('error.article.notExist'), HttpStatus.BAD_REQUEST);
    return article;
  }

  async update(id: string, updateArticleDto: Partial<UpdateArticleDto>) {
    return await this.articleManager.update(id, updateArticleDto);
  }

  async remove(id: string | string[], force: boolean = false) {
    return await this.articleManager.manager.transaction(async (manager: EntityManager) => {
      if (force) {
        return await manager.delete(Article, id);
      } else {
        await manager.softDelete(Article, id);
        return await manager.update(Article, id, { status: EnumStatus.Disabled });
      }
    });
  }

  async restore(id: string | string[]) {
    return await this.articleManager.manager.transaction(async (manager: EntityManager) => {
      let res = await manager.restore(Article, id);
      if (res.affected === 1) {
        res = await manager.update(Article, id, { status: EnumStatus.Normal });
      }
      return res;
    });
  }

  async pagination(page: number, limit: number, query: Partial<QueryArticleDto>) {
    const [list, total] = await this.articleManager.findAndCount({
      where: { title: query.title },
      order: { [query.sort]: query.order },
      skip: (page - 1) * limit,
      take: limit,
      relations: ['user', 'likes', 'views', 'comments', 'category', 'tags'],
      withDeleted: Boolean(query.withDeleted)
    });
    return {
      list,
      total,
      page: +page,
      limit: +limit
    };
  }
}
