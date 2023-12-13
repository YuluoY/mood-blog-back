import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UploadService } from './upload.service';
import * as COS from 'cos-nodejs-sdk-v5';
import { AppConfig } from '@/config';

@Controller('upload')
export class UploadController {
  private readonly cos: COS = new COS(AppConfig.plugin.cos);
  private readonly bucket: string = 'blog-1307950541';
  private readonly region: string = 'ap-nanjing';

  constructor(private readonly uploadService: UploadService) {}

  @Post()
  async createBucket(@Body() body: { formData: FormData; path: string }) {
    // const result = await this.cos.multipartInit({
    //   Bucket: this.bucket,
    //   Region: this.region,
    //   Key: body.path
    // });
    console.log(body);
  }
}
