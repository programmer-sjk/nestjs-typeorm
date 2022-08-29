import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ResponseEntity } from '../../common/response/ResponseEntity';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUser(): Promise<ResponseEntity> {
    const user = await this.userService.getUser();
    return ResponseEntity.OK();
  }

  @Post()
  addUser(): ResponseEntity {
    return ResponseEntity.OK();
  }
}
