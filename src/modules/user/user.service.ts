import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { AppService } from 'src/app.service';
import { I18nService } from 'nestjs-i18n';
import { IFindOneServiceOptions } from '@/types/core';
import { CookieOptions, Response } from 'express';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userManager: Repository<User>,

    private readonly i18n: I18nService,

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
        return await this.updateToken(manager, user);
      });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(queryUserDto: Partial<QueryUserDto>, { refreshToken, res }: IFindOneServiceOptions = {}) {
    try {
      return await this.userManager.manager.transaction(async (manager: EntityManager) => {
        const user = await manager.findOne(User, { where: queryUserDto });
        // 如果没有传refreshToken，则直接返回user，表示只是查询用户是否存在
        if (!refreshToken) return user;

        if (!user) throw new HttpException(this.i18n.t('error.user.noFound'), HttpStatus.BAD_REQUEST);
        const token = await this.updateToken(manager, user);
        await manager.update(User, { id: user.id }, { lastLoginAt: new Date() });
        if (res) {
          // 将最新的token存入cookie中
          const time = await this.saveTokenToCookie(res, token);
          user['expire'] = time;
          const { iv, encryptedData } = this.appService.encrypt('true', process.env.CSRF_TOKEN_SECRET);
          user['csrf_token'] = `${encryptedData}-${iv}`;
        }
        return user;
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    return await this.userManager.find();
  }

  /**
   * @description: 更新token
   * @param {EntityManager} manager 数据库管理器
   * @param {User} user 用户实体
   * @return {Promise<string>} token
   */
  private async updateToken(manager: EntityManager, user: User): Promise<string> {
    const token = await this.appService.generateToken({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role
    });
    await manager.update(User, { id: user.id }, { token });
    return token;
  }

  /**
   * @description: 将token存入cookie中
   * @param {Response} res 响应对象
   * @param {string} token token
   * @return {number} 返回当前时间戳
   */
  private async saveTokenToCookie(res: Response, token: string): Promise<number> {
    const defualt: CookieOptions = {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * parseInt(process.env.JWT_EXPIRES_IN),
      sameSite: 'lax'
    };
    this.appService.setCookie(res, process.env.JWT_COOKIE_NAME, token, defualt);
    return Date.now() + defualt.maxAge;
  }

  async pagination(page: number, limit: number, query: QueryUserDto) {
    const [list, total] = await this.userManager
      .createQueryBuilder('user')
      .where(query)
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
