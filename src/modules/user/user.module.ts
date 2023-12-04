import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.servicec';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from '@/app.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, AppService, JwtService]
})
export class UserModule {}
