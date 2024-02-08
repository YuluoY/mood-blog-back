import { Injectable } from '@nestjs/common';
import { CreateVisitorDto } from './dto/create-visitor.dto';
import { UpdateVisitorDto } from './dto/update-visitor.dto';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Visitor } from '@/modules/visitor/entities/visitor.entity';

@Injectable()
export class VisitorService {
  constructor(
    @InjectRepository(Visitor)
    private readonly visitorRep: Repository<Visitor>
  ) {}
  async create(createVisitorDto: Partial<CreateVisitorDto>) {
    return await this.visitorRep.manager.transaction(async (manager: EntityManager) => {
      const visitor = await manager.findOne(Visitor, {
        where: { ip: createVisitorDto.ip }
      });
      if (visitor) {
        // 更新count
        await manager.update(Visitor, visitor.id, {
          count: visitor.count + 1
        });
        visitor.count += 1;
        return visitor;
      }
      return await manager.save(Visitor, createVisitorDto);
    });
  }

  async findAllCount() {
    return {
      // 访问人数
      visitorCount: await this.visitorRep.count(),
      // 访问次数
      viewCount: (await this.visitorRep.query('select sum(count) from visitor'))[0].sum
    };
  }

  findAll() {
    return `This action returns all visitor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} visitor`;
  }

  update(id: number, updateVisitorDto: UpdateVisitorDto) {
    return `This action updates a #${id} visitor`;
  }

  remove(id: number) {
    return `This action removes a #${id} visitor`;
  }
}
