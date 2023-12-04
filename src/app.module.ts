import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfig } from './config';
import modules from './modules';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ...modules,
    TypeOrmModule.forRoot(AppConfig.orm as any),
    PassportModule,
    JwtModule.register(AppConfig.plugin.jwt as any)
  ],
  controllers: [AppController],
  providers: [AppService, JwtService]
})
export class AppModule {}
