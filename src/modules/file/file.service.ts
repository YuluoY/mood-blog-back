import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { EntityManager, Repository } from 'typeorm';
import * as COS from 'cos-nodejs-sdk-v5';
import { AppConfig } from '@/config';
import { UserService } from '../user/user.service';
import { unlink } from 'fs/promises';

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
  ) {}

  async localCreate(file: Express.Multer.File, { userId, filePath, localPath }) {
    if (!file) throw new HttpException('文件上传失败', HttpStatus.BAD_REQUEST);
    try {
      return await this.fileManager.manager.transaction(async (manager: EntityManager) => {
        const user = await this.userService.findOne({ id: userId });
        const { size, unit } = this.processFileUnit(file.size);
        const createFileDto: Partial<CreateFileDto> = {
          fieldname: file.fieldname,
          originalname: file.originalname,
          mimetype: file.mimetype,
          encoding: file.encoding,
          size: size + unit,
          url: filePath,
          user: user
        };
        await manager.save(File, createFileDto);
        return filePath;
      });
    } catch (error) {
      await this.removeFile(localPath);
      throw new HttpException('文件上传失败', HttpStatus.BAD_REQUEST);
    }
  }

  async create(file: Express.Multer.File, userId: string) {
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

        const { size, unit } = this.processFileUnit(file.size);
        const createFileDto: Partial<CreateFileDto> = {
          fieldname: file.fieldname,
          originalname: file.originalname,
          mimetype: file.mimetype,
          encoding: file.encoding,
          size: size + unit,
          url: res.Location,
          key: params.Key,
          bucket: params.Bucket,
          user: user
        };
        await manager.save(File, createFileDto);
        return 'https://' + res.Location;
      });
    } catch (error) {
      // await this.remove(params.Key);
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

  private processFileUnit(size: number) {
    let unit = 'B';
    if (size / 1024 > 1) {
      size = size / 1024;
      unit = 'KB';
    }
    if (size / 1024 > 1) {
      size = size / 1024;
      unit = 'MB';
    }
    if (size / 1024 > 1) {
      size = size / 1024;
      unit = 'GB';
    }
    return { size: size.toFixed(2), unit };
  }

  private removeFile(url: string) {
    return unlink(url);
  }
}
