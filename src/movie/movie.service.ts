import { Injectable } from '@nestjs/common';
import { MovieRepository } from './movie.repository';
import { MovieResponse } from './dto/MovieResponse';

@Injectable()
export class MovieService {
  constructor(private readonly movieRepository: MovieRepository) {}

  async findAll(): Promise<MovieResponse[]> {
    const movies = await this.movieRepository.find();
    return movies.map((movie) => new MovieResponse(movie));
  }

  async find(id: number): Promise<MovieResponse> {
    const movie = await this.movieRepository.findOne(id);
    return new MovieResponse(movie);
  }

  async register(request: CreateMovieRequest): Promise<void> {

  }

  async update(): Promise<void> {

  }

  async withDrawal(): Promise<void> {

  }
}
