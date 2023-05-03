import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserRequest } from './dto/CreateUserRequest';
import { UserResponse } from './dto/UserReponse';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  findAll(): Promise<UserResponse[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  find(@Param('id') id: number): Promise<UserResponse> {
    return this.userService.find(id);
  }

  @Post()
  signUp(@Body() request: CreateUserRequest): void {
    this.userService.signUp(request);
  }
}
