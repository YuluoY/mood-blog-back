import { Global, Module } from '@nestjs/common';
import { RestService } from './rest.service';
import { RestController } from './rest.controller';

@Global()
@Module({
  controllers: [RestController],
  providers: [RestService]
})
export class RestModule {}
