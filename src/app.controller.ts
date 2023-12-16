import { Controller, Get, Global, Res, Session as Sess } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { Success } from './types/template';
import { ExpressSessionPlus } from './types/core';
import { Public } from './decorator/Public';

@Global()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('code')
  @Public()
  getCode(@Res() res: Response, @Sess() session: ExpressSessionPlus) {
    const { data, text } = this.appService.getCode();
    session.code = text;
    res.send(Success<string>(data));
  }
}
