import { Module, forwardRef } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([File]), forwardRef(() => UserModule)],
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService]
})
export class FileModule {}
