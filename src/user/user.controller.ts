import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserRequest } from './dto/CreateUserRequest';
import { UserResponse } from './dto/UserReponse';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async findAll(): Promise<UserResponse[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async find(@Param('id') id: number): Promise<UserResponse> {
    return await this.userService.find(id);
  }

  @Post()
  async signUp(@Body() request: CreateUserRequest): Promise<void> {
    await this.userService.signUp(request);
  }
}
