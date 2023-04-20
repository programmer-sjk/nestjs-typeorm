import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from '../CreateUserDto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/users')
  getUserId(@Query('id') id): string {
    return id;
  }

  @Get('/users/:id')
  getUserIdByParam(@Param('id') id): string {
    return id + 'param';
  }

  // @Post('/users')
  // createUser(@Req() req: Request ): string {
  //   console.log(req.body)
  //   return 'ok';
  // }

  @Post('/users')
  createUser(@Body() request: CreateUserDto ): string {
    console.log(request)
    return 'ok';
  }
}
