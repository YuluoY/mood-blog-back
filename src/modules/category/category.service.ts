import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { FindManyOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '@/modules/category/entities/category.entity';
import { ArticleService } from '@/modules/article/article.service';
import { QueryCategoryDto } from '@/modules/category/dto/query-category.dto';
import { QueryUtil } from '@/global/QueryFilter';
import { Article } from '@/modules/article/entities/article.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,

    private readonly articleService: ArticleService
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    try {
      return await this.categoryRepository.manager.transaction(async (manager) => {
        const c = new Category();
        c.cateName = createCategoryDto.cateName;
        const category = await manager.findOne(Category, {
          where: { cateName: createCategoryDto.cateName }
        });
        if (category) throw new HttpException('分类已存在', HttpStatus.BAD_REQUEST);
        return await manager.save(c);
      });
    } catch (e) {
      throw new HttpException(e.message || e.toString(), HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(query: QueryCategoryDto) {
    return await this.categoryRepository.find(QueryUtil.findManyOptionsFilter(query));
  }

  async findOne(unique: QueryCategoryDto) {
    return await this.categoryRepository.findOne({
      where: unique,
      relations: ['article']
    });
  }

  async update(id: number, updateCategoryDto: Partial<UpdateCategoryDto>) {
    return 'This action updates a #';
  }

  async remove(id: string | string[], force: boolean) {
    if (force) {
      return await this.categoryRepository.delete(id);
    } else {
      const articleRepo = this.categoryRepository.manager.getRepository(Article);
      // 将这个分类下的所有文章的deletedAt字段设置为当前时间
      await articleRepo.update({ category: id as any }, { deletedAt: new Date() });
      return await this.categoryRepository.softDelete(id);
    }
  }

  async restore(id: string | string[]) {
    const articleRepo = this.categoryRepository.manager.getRepository(Article);
    // 将这个分类下的所有文章的deletedAt字段设置为null
    await articleRepo.update({ category: id as any }, { deletedAt: null });
    return await this.categoryRepository.restore(id);
  }
}
