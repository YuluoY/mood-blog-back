import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { VisitorService } from './visitor.service';
import { CreateVisitorDto } from './dto/create-visitor.dto';
import { UpdateVisitorDto } from './dto/update-visitor.dto';
import { Public } from '@/decorator/Public';
import { QueryVisitorDto } from '@/modules/visitor/dto/query-visitor.dto';

@Controller('visitor')
export class VisitorController {
  constructor(private readonly visitorService: VisitorService) {}

  @Post('add')
  @Public()
  create(@Body() createVisitorDto: Partial<CreateVisitorDto>) {
    return this.visitorService.create(createVisitorDto);
  }

  @Get('count')
  @Public()
  findAllCount() {
    return this.visitorService.findAllCount();
  }

  @Get('all')
  findAll(@Query('query') query: QueryVisitorDto) {
    return this.visitorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.visitorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVisitorDto: UpdateVisitorDto) {
    return this.visitorService.update(+id, updateVisitorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.visitorService.remove(+id);
  }
}
