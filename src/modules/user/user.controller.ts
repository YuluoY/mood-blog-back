import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  Res,
  Session
} from '@nestjs/common';
import { UserService } from './user.service';
import { EnumDatabaseTableName, ExpressSessionPlus } from 'src/types/core';
import { QueryUserDto } from './dto/query-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Request, Response } from 'express';
import { LoginUserDto } from './dto/login-user.dto';
import { I18n, I18nContext } from 'nestjs-i18n';
import { Public } from '@/decorator/Public';

@Controller(EnumDatabaseTableName.User)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  async findAll() {
    return await this.userService.findAll();
  }

  @Get('getById')
  async findById(@Query('unique') unique: QueryUserDto) {
    return await this.userService.findOne(unique);
  }

  @Get('login')
  @Public()
  async login(
    @Query() loginData: LoginUserDto,
    @Req() req: Request,
    @Res() res: Response,
    @Session() session: ExpressSessionPlus,
    @I18n() i18n: I18nContext
  ) {
    console.log(loginData.code, session.code, session);
    if (loginData.code?.toLocaleLowerCase() !== session.code?.toLocaleLowerCase())
      throw new HttpException(i18n.t('error.code'), HttpStatus.BAD_REQUEST);
    const key = loginData?.username ? 'username' : 'email';
    const user = await this.userService.findOne({ [key]: loginData[key] }, { refreshToken: true, res, session });
    res.status(HttpStatus.OK).send({
      code: 200,
      data: user,
      success: true
    });
  }

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Get('pagination/:page/:limit')
  @Public()
  async pagination(@Query() query: QueryUserDto, @Param('page') page: number, @Param('limit') limit: number) {
    return await this.userService.pagination(page, limit, query);
  }

  @Delete('remove')
  async remove(@Body('id') id: string | string[]) {}
}
