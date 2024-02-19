import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

@Injectable()
export class RestService {
  constructor(private readonly entityManager: EntityManager) {}

  async findOne(module: any) {
    return await this.entityManager.getRepository(module).find();
  }
}
