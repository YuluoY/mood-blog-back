import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfig } from './config';
import modules from './modules';
import { JwtModule } from '@nestjs/jwt';
import { I18nModule } from 'nestjs-i18n';

@Module({
  imports: [
    ...modules,
    TypeOrmModule.forRoot(AppConfig.orm),
    I18nModule.forRoot(AppConfig.plugin.i18n),
    JwtModule.register(AppConfig.plugin.jwt)
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService]
})
export class AppModule {}
