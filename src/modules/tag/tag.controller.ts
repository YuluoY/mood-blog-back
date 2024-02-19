import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { QueryTagDto } from '@/modules/tag/dto/query-tag.dto';
import { Public } from '@/decorator/Public';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post('add')
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagService.create(createTagDto);
  }

  @Get('all')
  @Public()
  findAll(@Param('query') query: QueryTagDto) {
    return this.tagService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tagService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagService.update(id, updateTagDto);
  }

  @Delete('remove')
  remove(@Query('id') id: string | string[], @Query('force') force: boolean = false) {
    return this.tagService.remove(id, force ? JSON.parse(String(force)) : false);
  }

  @Post('restore')
  restore(@Body('id') id: string | string[]) {
    return this.tagService.restore(id);
  }

  @Get('pagination/:page/:limit')
  @Public()
  pagination(@Param('page') page: number, @Param('limit') limit: number, @Query() query: QueryTagDto) {
    return this.tagService.pagination(page, limit, query);
  }
}
