import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entity/User.entity';
import { CreateUserDto } from './dto/CreateUserDto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  find(@Param('id') id: number): Promise<User> {
    return this.userService.find(id);
  }

  @Post()
  signUp(@Body() request: CreateUserDto): void {
    this.userService.signUp(request);
  }
}
