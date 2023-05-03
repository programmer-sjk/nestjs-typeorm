import { Movie } from '../entity/Movie.entity';

export class UpdateMovieScoreRequest {
  private rottenScore: number;
  private imDbScore: number;
  private score: number;

  update(movie: Movie): Movie {
    movie.rottenScore = this.rottenScore;
    movie.imDbScore = this.imDbScore;
    movie.score = this.score;

    return movie;
  }
}
