import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { AppService } from 'src/app.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userManager: Repository<User>,
    private readonly appService: AppService
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      await this.userManager.manager.transaction(async (manager: EntityManager) => {
        const isCreatedUser = await manager.findOne(User, {
          where: { username: createUserDto?.username, email: createUserDto?.email, phone: createUserDto?.phone }
        });
        if (isCreatedUser) throw new HttpException('用户已存在', HttpStatus.BAD_REQUEST);
        const user = await manager.create(User, createUserDto);
        const token = this.appService.generateToken(user);
        user.token = token;
        const res = await manager.save(user);
        return res;
      });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findById(id: string) {
    try {
      const user = await this.userManager.findOne({ where: { id } });
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  findAll() {
    throw new Error('Method not implemented.');
  }
}
