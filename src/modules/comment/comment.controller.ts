import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { QueryCommentDto } from '@/modules/comment/dto/query-comment.dto';
import { EnumDatabaseTableName } from '@/types/core';
import { Public } from '@/decorator/Public';

@Controller(EnumDatabaseTableName.Comment)
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('add')
  @Public()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  @Get()
  async findOne(@Query('unique') unique: Partial<QueryCommentDto>) {
    return await this.commentService.findOne(unique);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(id, updateCommentDto);
  }

  @Delete()
  remove(@Body('id') id: string | string[]) {
    return this.commentService.remove(id);
  }

  @Patch('restore')
  async restore(@Query('id') id: string | string[]) {
    return await this.commentService.restore(id);
  }

  @Get('pagination/:page/:limit')
  async pagination(@Param('page') page: number, @Param('limit') limit: number, @Query() query: QueryCommentDto) {
    return await this.commentService.pagination(page, limit, query);
  }
}
