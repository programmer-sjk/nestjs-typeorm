import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  findAll(): Promise<string> {
    return this.userService.findAll();
  }

  @Get(':id')
  find(): string {
    return this.userService.find();
  }

  @Post()
  signUp(): string {
    return this.userService.signUp();
  }
}
