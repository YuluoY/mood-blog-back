import { Body, Controller, Get, HttpException, HttpStatus, Post, Query, Req, Session } from '@nestjs/common';
import { UserService } from './user.servicec';
import { EnumDatabaseTableName, ExpressSessionPlus } from 'src/types/core';
import { QueryUserDto } from './dto/query-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Request } from 'express';
import { ITokenUser } from '@/types/user';
import { LoginUserDto } from './dto/login-user.dto';
import { I18n, I18nContext } from 'nestjs-i18n';

@Controller(EnumDatabaseTableName.User)
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('/all')
  async findAll() {
    return await this.userService.findAll();
  }

  @Get()
  async findById(@Query('unique') unique: QueryUserDto) {
    return await this.userService.findOne(unique);
  }

  @Get('login')
  async login(
    @Query() loginData: LoginUserDto,
    @Req() req: Request,
    @Session() session: ExpressSessionPlus,
    @I18n() i18n: I18nContext
  ) {
    console.log(loginData.code, session.code);
    if (loginData.code?.toLocaleLowerCase() !== session.code?.toLocaleLowerCase())
      throw new HttpException(i18n.t('error.code'), HttpStatus.BAD_REQUEST);
    const key = loginData?.username ? 'username' : 'email';
    return await this.userService.findOne({ [key]: loginData[key] }, { refreshToken: true });
  }

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }
}
