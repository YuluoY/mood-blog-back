import { Controller } from '@nestjs/common';
import { UserService } from './user.servicec';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
}
