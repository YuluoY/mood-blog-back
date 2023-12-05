import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { AppService } from 'src/app.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userManager: Repository<User>,

    private readonly appService: AppService
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      return await this.userManager.manager.transaction(async (manager: EntityManager) => {
        const isCreatedUser = await manager.findOne(User, {
          where: { username: createUserDto?.username, email: createUserDto?.email, phone: createUserDto?.phone }
        });
        if (isCreatedUser) throw new HttpException('用户已存在', HttpStatus.BAD_REQUEST);
        const user = await manager.save(User, createUserDto);
        const token = await this.appService.generateToken({
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role
        });
        await manager.update(User, { id: user.id }, { token });
        return token;
      });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(queryUserDto: QueryUserDto) {
    try {
      const user = await this.userManager.findOne({ where: queryUserDto });
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  findAll() {
    // throw new Error('Method not implemented.');
    return this.userManager.find();
  }
}
