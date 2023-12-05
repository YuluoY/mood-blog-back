import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfig } from './config';
import modules from './modules';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [...modules, TypeOrmModule.forRoot(AppConfig.orm), JwtModule.register(AppConfig.plugin.jwt)],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService]
})
export class AppModule {}
