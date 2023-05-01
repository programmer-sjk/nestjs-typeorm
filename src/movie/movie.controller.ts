import { Controller, Delete, Get, Injectable, Patch, Post } from '@nestjs/common';
import { MovieService } from './movie.service';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  async findAll(): Promise<void> {

  }

  @Get()
  async find(): Promise<void> {

  }

  @Post()
  async register(): Promise<void> {

  }

  @Patch()
  async update(): Promise<void> {

  }

  @Delete()
  async withDrawal(): Promise<void> {
    
  }
}
