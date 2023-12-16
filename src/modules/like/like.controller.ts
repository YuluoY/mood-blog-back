import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { QueryLikeDto } from '@/modules/like/dto/query-like.dto';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  create(@Body() createLikeDto: CreateLikeDto) {
    return this.likeService.create(createLikeDto);
  }

  @Get()
  async findAll() {
    return await this.likeService.findAll();
  }

  @Get()
  async findOne(@Query('unique') unique: Partial<QueryLikeDto>) {
    return await this.likeService.findOne(unique);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateLikeDto: UpdateLikeDto) {
    return await this.likeService.update(id, updateLikeDto);
  }

  @Delete()
  remove(@Body('id') id: string | string[]) {
    return this.likeService.remove(id);
  }

  @Patch('restore')
  async restore(@Query('id') id: string | string[]) {
    return await this.likeService.restore(id);
  }
}
