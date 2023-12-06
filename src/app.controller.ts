import { Controller, Get, Res, Session as Sess } from '@nestjs/common';
import { Response } from 'express';
import { Session } from 'express-session';
import { AppService } from './app.service';
import { Success } from './types/template';
import { ExpressSessionPlus } from './types/core';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('code')
  getCode(@Res() res: Response, @Sess() session: ExpressSessionPlus) {
    const { data, text } = this.appService.getCode();
    session.code = text;
    res.send(Success<string>(data));
  }
}
