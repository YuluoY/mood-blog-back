import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Req } from '@nestjs/common';
import { FileService } from './file.service';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { IParseToken, IUploadFile } from '@/types/core';
import { Request } from 'express';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile() file: Partial<IUploadFile>, @Req() request: Request & { user: IParseToken }) {
    return this.fileService.create(file, request.user.id);
  }

  @Get()
  findAll() {
    return this.fileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.fileService.update(+id, updateFileDto);
  }

  @Delete(':key')
  remove(@Param('key') key: string) {
    return this.fileService.remove(key);
  }
}
