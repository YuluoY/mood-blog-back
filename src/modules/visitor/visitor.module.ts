import { Module } from '@nestjs/common';
import { VisitorService } from './visitor.service';
import { VisitorController } from './visitor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Visitor } from '@/modules/visitor/entities/visitor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Visitor])],
  controllers: [VisitorController],
  providers: [VisitorService]
})
export class VisitorModule {}
