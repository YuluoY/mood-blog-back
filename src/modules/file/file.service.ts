import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { EntityManager, Repository } from 'typeorm';
import * as COS from 'cos-nodejs-sdk-v5';
import { AppConfig } from '@/config';
import { UserService } from '../user/user.service';
import { IUploadFile } from '@/types/core';

@Injectable()
export class FileService {
  private readonly cos: COS = new COS(AppConfig.plugin.cos);
  private readonly bucket: string = 'blog-1307950541';
  private readonly region: string = 'ap-nanjing';
  private readonly baseParams: COS.PutObjectParams = {
    Bucket: this.bucket,
    Region: this.region,
    Body: undefined,
    Key: ''
  };

  constructor(
    @InjectRepository(File)
    private readonly fileManager: Repository<File>,
    private readonly userService: UserService
  ) { }

  async create(file: Partial<IUploadFile>, userId: string) {
    const params = Object.assign(this.baseParams, {
      Body: file.buffer,
      Key: `/image/${Date.now()}-${file.originalname}`
    });
    try {
      return await this.fileManager.manager.transaction(async (manager: EntityManager) => {
        // 视频上传
        if (file.mimetype.includes('video')) {
          params.Key = '/video/' + Date.now() + '-' + file.originalname;
        }
        // 音频上传
        if (file.mimetype.includes('audio')) {
          params.Key = '/audio/' + Date.now() + '-' + file.originalname;
        }
        const res = await this.cos.putObject(params);
        const user = await this.userService.findOne({ id: userId });
        const createFileDto: Partial<CreateFileDto> = {
          fieldname: file.fieldname,
          originalname: file.originalname,
          mimetype: file.mimetype,
          encoding: file.encoding,
          size: (file.size / 1024).toFixed(2) + 'KB',
          url: res.Location,
          key: params.Key,
          bucket: params.Bucket,
          user: user
        };
        await manager.save(File, createFileDto);
        return res.Location;
      });
    } catch (error) {
      await this.remove(params.Key);
      throw new HttpException('文件上传失败', HttpStatus.BAD_REQUEST);
    }
  }

  findAll() {
    return `This action returns all file`;
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  update(id: number, updateFileDto: UpdateFileDto) {
    return `This action updates a #${id} file`;
  }

  async remove(key: string) {
    const params = Object.assign(this.baseParams, {
      Key: key
    });
    const res = await this.cos.deleteObject(params);
    return res;
  }
}
