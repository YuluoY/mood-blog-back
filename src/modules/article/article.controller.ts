import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Request } from 'express';
import { IParseToken } from '@/types/core';
import { QueryArticleDto } from '@/modules/article/dto/query-article.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post('add')
  async create(@Body() createArticleDto: Partial<CreateArticleDto>, @Req() request: Request & { user: IParseToken }) {
    return await this.articleService.create(createArticleDto, request.user.id);
  }

  @Get('all')
  async findAll() {
    return await this.articleService.findAll();
  }

  @Get()
  async findOne(@Query('unique') unique: QueryArticleDto) {
    return await this.articleService.findOne(unique);
  }

  @Patch('update/:id')
  async update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return await this.articleService.update(id, updateArticleDto);
  }

  @Delete('remove')
  async remove(@Query('id') id: string | string[], @Query('force') force: boolean = false) {
    return await this.articleService.remove(id, Boolean(force));
  }

  @Post('restore')
  async restore(@Body('id') id: string | string[]) {
    return await this.articleService.restore(id);
  }

  @Get('pagination/:page/:limit')
  async pagination(
    @Param('page') page: number,
    @Param('limit') limit: number,
    @Query() query: Partial<QueryArticleDto>
  ) {
    return await this.articleService.pagination(page, limit, query);
  }
}
