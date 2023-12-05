import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UserService } from './user.servicec';
import { EnumDatabaseTableName } from 'src/types/core';
import { QueryUserDto } from './dto/query-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Public } from '@/decorator/Public';

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

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }
}
