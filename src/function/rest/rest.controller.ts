import { Controller, Get, Req } from '@nestjs/common';
import { RestService } from './rest.service';
import { Public } from '@/decorator/Public';
import { Request } from 'express';

@Controller('rest')
export class RestController {
  constructor(private readonly restService: RestService) {}

  @Get(':module')
  @Public()
  async findOne(@Req() req: Request) {
    return await this.restService.findOne(req.params.module);
  }
}
