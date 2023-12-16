import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '@/modules/category/entities/category.entity';
import { ArticleService } from '@/modules/article/article.service';
import { QueryCategoryDto } from '@/modules/category/dto/query-category.dto';

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
        if (createCategoryDto.article && createCategoryDto.article.length) {
          for (const article of createCategoryDto.article) {
            const a = await this.articleService.findOne({ id: article });
            c.article.push(a);
          }
        }
        await manager.save(c);
      });
    } catch (e) {
      throw new HttpException(e.message || e.toString(), HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    return await this.categoryRepository.find({
      relations: ['article']
    });
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

  async remove(id: string | string[]) {
    return await this.categoryRepository.softDelete(id);
  }

  async restore(id: string | string[]) {
    return await this.categoryRepository.restore(id);
  }
}
