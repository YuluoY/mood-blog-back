import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ViewService } from './view.service';
import { CreateViewDto } from './dto/create-view.dto';
import { UpdateViewDto } from './dto/update-view.dto';
import { Public } from '@/decorator/Public';
import { EnumDatabaseTableName } from '@/types/core';

@Controller(EnumDatabaseTableName.View)
export class ViewController {
  constructor(private readonly viewService: ViewService) {}

  @Post('add')
  @Public()
  create(@Body() createViewDto: CreateViewDto) {
    return this.viewService.create(createViewDto);
  }

  @Get()
  findAll() {
    return this.viewService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.viewService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateViewDto: UpdateViewDto) {
    return this.viewService.update(+id, updateViewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.viewService.remove(+id);
  }
}
