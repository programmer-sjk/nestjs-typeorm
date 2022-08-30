import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ResponseEntity } from '../../common/response/ResponseEntity';
import { UserAddRequest } from './dto/UserAddRequest';
import { Users } from 'src/common/entity/User.entity';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUser(): Promise<ResponseEntity<Users[]>> {
    const users = await this.userService.getUser();
    return ResponseEntity.OK_WITH(users);
  }

  @Post()
  async addUser(@Body() dto: UserAddRequest): Promise<ResponseEntity<string> {
    await this.userService.addUser(dto);
    return ResponseEntity.OK();
  }
}
