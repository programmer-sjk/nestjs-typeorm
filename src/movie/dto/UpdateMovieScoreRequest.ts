import { Movie } from '../entity/Movie.entity';

export class UpdateMovieScoreRequest {
  rottenScore: number;
  imDbScore: number;
  score: number;
}
