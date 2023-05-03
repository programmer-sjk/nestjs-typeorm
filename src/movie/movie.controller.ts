import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieResponse } from './dto/MovieResponse';
import { CreateMovieRequest } from './dto/CreateMovieRequest';
import { UpdateMovieRequest } from './dto/UpdateMovieRequest';
import { UpdateMovieScoreRequest } from './dto/UpdateMovieScoreRequest';

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
  async register(@Body() request: CreateMovieRequest): Promise<void> {
    await this.movieService.register(request);
  }

  @Patch()
  async update(
    @Param() id: number,
    @Body() request: UpdateMovieRequest,
  ): Promise<void> {
    await this.movieService.update(id, request);
  }

  @Patch()
  async updateScore(
    @Param() id: number,
    @Body() request: UpdateMovieScoreRequest,
  ): Promise<void> {
    await this.movieService.updateScore(id, request);
  }

  @Delete()
  async remove(@Param() id: number): Promise<void> {
    await this.movieService.remove(id);
  }
}
