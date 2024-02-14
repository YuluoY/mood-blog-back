import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { FindManyOptions, FindOptions, Repository } from 'typeorm';
import { Tag } from '@/modules/tag/entities/tag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryTagDto } from '@/modules/tag/dto/query-tag.dto';
import { QueryUtil } from '@/global/QueryFilter';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagManager: Repository<Tag>
  ) {}
  async create(createTagDto: CreateTagDto) {
    const tag = await this.tagManager.findOne({
      where: { tagName: createTagDto.tagName }
    });
    if (tag) throw new HttpException('标签名称已存在', HttpStatus.BAD_REQUEST);
    return await this.tagManager.save(createTagDto);
  }

  async findAll(queryTagDto: QueryTagDto) {
    return await this.tagManager.find(QueryUtil.findManyOptionsFilter(queryTagDto));
  }

  async findOne(id: string, updateTagDto?: UpdateTagDto) {
    return await this.tagManager.findOne({
      where: { id },
      relations: ['article']
    });
  }

  async update(id: string, updateTagDto: UpdateTagDto) {
    return await this.tagManager.update(id, updateTagDto);
  }

  async remove(id: string | string[], force: boolean = false) {
    if (force) return await this.tagManager.delete(id);
    else return await this.tagManager.softDelete(id);
  }

  async restore(id: string | string[]) {
    return await this.tagManager.restore(id);
  }

  async pagination(page: number, limit: number, query: Partial<QueryTagDto> = {}) {
    const [list, total] = await this.tagManager.findAndCount({
      relations: ['article'],
      take: limit,
      skip: (page - 1) * limit,
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
