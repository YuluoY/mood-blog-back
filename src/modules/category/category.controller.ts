import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { EnumDatabaseTableName } from '@/types/core';
import { QueryCategoryDto } from '@/modules/category/dto/query-category.dto';

@Controller(EnumDatabaseTableName.Category)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoryService.create(createCategoryDto);
  }

  @Get()
  async findAll() {
    return await this.categoryService.findAll();
  }

  @Get()
  async findOne(@Query() unique: QueryCategoryDto) {
    return await this.categoryService.findOne(unique);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete()
  remove(@Body('id') id: string | string[]) {
    return this.categoryService.remove(id);
  }

  @Patch()
  restore(@Query('id') id: string | string[]) {
    return this.categoryService.restore(id);
  }
}
