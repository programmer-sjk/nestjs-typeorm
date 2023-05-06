import { IsNotEmpty, Max, MaxLength } from 'class-validator';
import { Review } from '../entity/Review.entity';
import { Movie } from '../../movie/entity/Movie.entity';

export class CreateReviewRequest {
  @IsNotEmpty()
  @MaxLength(500)
  private content: string;

  @IsNotEmpty()
  private movieId: number;

  constructor(content: string, movieId: number) {
    this.content = content;
    this.movieId = movieId;
  }

  toEntity(movie: Movie): Review {
    return new Review(this.content, movie);
  }

  getMovieId(): number {
    return this.movieId;
  }
}
