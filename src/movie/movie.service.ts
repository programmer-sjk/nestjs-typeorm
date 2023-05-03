import { Injectable } from '@nestjs/common';
import { MovieRepository } from './movie.repository';
import { MovieResponse } from './dto/MovieResponse';
import { CreateMovieRequest } from './dto/CreateMovieRequest';
import { UpdateMovieRequest } from './dto/UpdateMovieRequest';
import { Movie } from './entity/Movie.entity';
import { UpdateMovieScoreRequest } from './dto/UpdateMovieScoreRequest';

@Injectable()
export class MovieService {
  constructor(private readonly movieRepository: MovieRepository) {}

  async findAll(): Promise<MovieResponse[]> {
    const movies = await this.movieRepository.find();
    return movies.map((movie) => new MovieResponse(movie));
  }

  async find(id: number): Promise<MovieResponse> {
    const movie = await this.findOne(id);
    return new MovieResponse(movie);
  }

  async register(request: CreateMovieRequest): Promise<void> {
    await this.movieRepository.save(request.toEntity());
  }

  async update(
    id: number,
    request: UpdateMovieRequest | UpdateMovieScoreRequest,
  ): Promise<void> {
    const movie = await this.findOne(id);
    const updatedMovie: Movie = request.update(movie);
    await this.movieRepository.save(updatedMovie);
  }

  async remove(id: number): Promise<void> {
    await this.movieRepository.remove(id);
  }

  private async findOne(id: number): Promise<Movie> {
    return await this.movieRepository.findOne(id);
  }
}
