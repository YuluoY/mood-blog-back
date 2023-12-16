import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

@Injectable()
export class RestService {
  constructor(private readonly entityManager: EntityManager) {}

  async findOne(module: any) {
    return await this.entityManager.find(module, {
      where: {}
    });
  }
}
