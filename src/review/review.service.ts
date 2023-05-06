import { Injectable } from '@nestjs/common';
import { ReviewRepository } from './review.repository';
import { Review } from './entity/Review.entity';
import { CreateReviewRequest } from './dto/CreateReviewRequest';
import { MovieRepository } from '../movie/movie.repository';

@Injectable()
export class ReviewService {
  constructor(
    private readonly reviewRepository: ReviewRepository,
    private readonly movieRepository: MovieRepository,
  ) {}

  async register(request: CreateReviewRequest): Promise<void> {
    const movie = await this.movieRepository.findOneOrFail(
      request.getMovieId(),
    );
    await this.reviewRepository.save(request.toEntity(movie));
  }

  async remove(id: number): Promise<void> {
    const review = await this.findOne(id);
    await this.reviewRepository.remove(review);
  }

  private async findOne(id: number): Promise<Review> {
    return this.reviewRepository.findOne(id);
  }
}
