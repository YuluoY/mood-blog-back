import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Request } from 'express';
import { IParseToken } from '@/types/core';
import { QueryArticleDto } from '@/modules/article/dto/query-article.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post('add')
  async create(@Body() createArticleDto: CreateArticleDto, @Req() request: Request & { user: IParseToken }) {
    return await this.articleService.create(createArticleDto, request.user.id);
  }

  @Get('all')
  async findAll() {
    return await this.articleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.articleService.findOne(id);
  }

  @Patch('update/:id')
  async update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return await this.articleService.update(id, updateArticleDto);
  }

  @Delete('remove')
  async remove(@Body('id') id: string | string[]) {
    return await this.articleService.remove(id);
  }

  @Patch('restore')
  async restore(@Body('id') id: string | string[]) {
    return await this.articleService.restore(id);
  }

  @Get('pagination/:page/:limit')
  async pagination(
    @Param('page') page: number,
    @Param('limit') limit: number,
    @Body() query: Partial<QueryArticleDto>
  ) {
    return await this.articleService.pagination(page, limit, query);
  }
}
