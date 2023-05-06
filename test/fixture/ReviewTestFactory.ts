import { Movie } from '../../src/movie/entity/Movie.entity';
import { CreateReviewRequest } from '../../src/review/dto/CreateReviewRequest';
import { Review } from '../../src/review/entity/Review.entity';

export class ReviewTestFactory {
  static create(content: string, movie: Movie) {
    return new Review(content, movie);
  }

  static createRequest(content: string, movieId: number) {
    return new CreateReviewRequest(content, movieId);
  }
}
