import { Injectable } from '@nestjs/common';
import { MovieRepository } from './movie.repository';
import { MovieResponse } from './dto/MovieResponse';
import { CreateMovieRequest } from './dto/CreateMovieRequest';
import { UpdateMovieRequest } from './dto/UpdateMovieRequest';
import { Movie } from './entity/Movie.entity';
import { UpdateMovieScoreRequest } from './dto/UpdateMovieScoreRequest';
import { SubTitleLanguage } from './enum/SubTitleLanguage';

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

  async update(id: number, req: UpdateMovieRequest): Promise<void> {
    const movie = await this.findOne(id);

    movie.update(
      req.title,
      SubTitleLanguage[req.subTitleLanguage],
      req.madeBy,
      req.filmCompany,
      req.description,
    );

    await this.movieRepository.save(movie);
  }

  async updateScore(id: number, req: UpdateMovieScoreRequest) {
    const movie = await this.findOne(id);
    movie.updateScore(req.rottenScore, req.imDbScore, req.score);
    await this.movieRepository.save(movie);
  }

  async remove(id: number): Promise<void> {
    const movie = await this.findOne(id);
    await this.movieRepository.remove(movie);
  }

  private async findOne(id: number): Promise<Movie> {
    return await this.movieRepository.findOne(id);
  }
}
