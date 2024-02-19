import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Req } from '@nestjs/common';
import { FileService } from './file.service';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { IParseToken } from '@/types/core';
import { Request } from 'express';
import { AppConfig } from '@/config';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('localUpload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: AppConfig.plugin.multer.storage,
      fileFilter(req: Request, file, callback: (error: Error | null, acceptFile: boolean) => void) {
        // 上传文件的后缀名
        const ext = file.originalname.split('.').pop();
        const allowExt = ['jpg', 'jpeg', 'png', 'gif', 'mp4', 'mp3', 'wav', 'flac'];
        if (allowExt.includes(ext)) {
          callback(null, true);
        } else {
          callback(new Error('文件类型错误'), false);
        }
      }
    })
  )
  async localCreate(@UploadedFile() file: Express.Multer.File, @Req() request: Request & { user: IParseToken }) {
    console.log(file, 'file');
    return await this.fileService.localCreate(file, {
      userId: request.user.id,
      filePath: request.body.filePath,
      localPath: request.body.localPath
    });
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile() file: Express.Multer.File, @Req() request: Request & { user: IParseToken }) {
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
