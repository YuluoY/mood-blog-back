import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { EnumDatabaseTableName } from '@/types/core';
import { QueryCategoryDto } from '@/modules/category/dto/query-category.dto';
import { QueryTagDto } from '@/modules/tag/dto/query-tag.dto';
import { Public } from '@/decorator/Public';

@Controller(EnumDatabaseTableName.Category)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('add')
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoryService.create(createCategoryDto);
  }

  @Get('all')
  @Public()
  async findAll(@Param('query') query: QueryCategoryDto) {
    return await this.categoryService.findAll(query);
  }

  @Get()
  async findOne(@Query() unique: QueryCategoryDto) {
    return await this.categoryService.findOne(unique);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete('remove')
  remove(@Query('id') id: string | string[], @Query('force') force: boolean) {
    force = force ? JSON.parse(String(force)) : false;
    return this.categoryService.remove(id, force);
  }

  @Post('restore')
  restore(@Body('id') id: string | string[]) {
    return this.categoryService.restore(id);
  }
}
