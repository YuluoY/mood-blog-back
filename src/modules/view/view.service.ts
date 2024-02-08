import { Injectable } from '@nestjs/common';
import { CreateViewDto } from './dto/create-view.dto';
import { UpdateViewDto } from './dto/update-view.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { View } from '@/modules/view/entities/view.entity';
import { User } from '@/modules/user/entities/user.entity';
import { Visitor } from '@/modules/visitor/entities/visitor.entity';
import { Article } from '@/modules/article/entities/article.entity';

@Injectable()
export class ViewService {
  constructor(
    @InjectRepository(View)
    private readonly viewRepo: Repository<View>
  ) {}

  async create(createViewDto: CreateViewDto) {
    const view = this.viewRepo.create();
    if (createViewDto.userId) {
      view.user = this.viewRepo.manager.create(User, {
        id: createViewDto.userId
      });
    }
    if (createViewDto.visitorId) {
      view.visitor = this.viewRepo.manager.create(Visitor, {
        id: createViewDto.visitorId
      });
    }
    if (createViewDto.articleId) {
      view.article = this.viewRepo.manager.create(Article, {
        id: createViewDto.articleId
      });
    }
    return await this.viewRepo.save(view);
  }

  findAll() {
    return `This action returns all view`;
  }

  findOne(id: number) {
    return `This action returns a #${id} view`;
  }

  update(id: number, updateViewDto: UpdateViewDto) {
    return `This action updates a #${id} view`;
  }

  remove(id: number) {
    return `This action removes a #${id} view`;
  }
}
