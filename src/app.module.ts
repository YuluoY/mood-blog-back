import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfig } from './config';
import modules from './modules';

@Module({
  imports: [...modules, TypeOrmModule.forRoot(AppConfig.orm as any)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
