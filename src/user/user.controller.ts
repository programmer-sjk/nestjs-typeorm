import { Controller, Get, Inject, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  @Inject(UserService)
  private userService: UserService;

  @Get()
  findAll(): string {
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
