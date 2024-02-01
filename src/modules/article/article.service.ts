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
          const isExistTag = await manager.findOne(Tag, { where: { tagName: tag.tagName } });
          if (isExistTag) {
            createArticleDto.tags[i] = isExistTag;
          } else {
            const newTag = manager.create(Tag, { tagName: tag.tagName });
            newTags.push(newTag);
            createArticleDto.tags[i] = newTag;
          }
        }
        if (newTags.length) {
          await manager.save(Tag, newTags);
        }
        // 分类的处理
        if (createArticleDto.category) {
          const category = await manager.findOne(Category, { where: { id: createArticleDto.category.id } });
          if (!category) throw new HttpException(this.i18n.t('error.category.notExist'), HttpStatus.BAD_REQUEST);
          createArticleDto.category = category;
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
    // const article = await this.articleManager.findOne({
    //   where: data,
    //   relations: ['user']
    // });
    // if (!article) throw new HttpException(this.i18n.t('error.article.notExist'), HttpStatus.BAD_REQUEST);
    // return article;
    return null;
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
    const qb = this.articleManager.createQueryBuilder('article');
    qb.leftJoinAndSelect('article.tags', 'tag');
    qb.leftJoinAndSelect('article.category', 'category');
    qb.leftJoinAndSelect('article.user', 'user');
    qb.leftJoinAndSelect('article.likes', 'like');
    qb.leftJoinAndSelect('article.views', 'view');
    qb.leftJoinAndSelect('article.comments', 'comment');
    if (query?.status) {
      qb.where('article.status = :status', { status: query.status });
    }
    if (query.tags?.length) {
      // 查找tags里面包含的文章，并且将文章的tags也查出来，并返回此文章下的所有tags
      qb.andWhere('tag.tagName IN (:...tagName)', { tagName: query.tags });
    }
    if (query?.category) {
      qb.where('category.id = :id', { id: query.category });
    }
    if (query?.withDeleted) {
      qb.withDeleted();
    }
    if (query?.title) {
      qb.where('article.title like :title', { title: `%${query.title}%` });
    }
    if (query?.sort) {
      qb.orderBy(`article.${query.sort}`, query.order || 'DESC');
    }
    const [list, total] = await qb
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      list,
      total,
      page: +page,
      limit: +limit
    };
  }
}
