import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieResponse } from './dto/MovieResponse';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  async findAll(): Promise<MovieResponse[]> {
    return this.movieService.findAll();
  }

  @Get(':id')
  async find(@Param() id: number): Promise<MovieResponse> {
    return this.movieService.find(id);
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
