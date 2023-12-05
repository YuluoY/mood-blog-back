import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.servicec';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from '@/app.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, AppService],
  exports: [UserService]
})
export class UserModule {}
