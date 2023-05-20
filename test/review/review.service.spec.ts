import { Repository } from 'typeorm';
import { ReviewService } from '../../src/review/review.service';
import { Review } from '../../src/review/entity/Review.entity';
import { Test } from '@nestjs/testing';
import { getOrmModule } from '../../src/common/getRealOrmModule';
import { ReviewModule } from '../../src/review/review.module';
import { ReviewRepository } from '../../src/review/review.repository';
import { MovieRepository } from '../../src/movie/movie.repository';
import { Movie } from '../../src/movie/entity/Movie.entity';
import { MovieTestFactory } from '../fixture/MovieTestFactory';
import { ReviewTestFactory } from '../fixture/ReviewTestFactory';

describe('ReviewService', () => {
  let reviewService: ReviewService;
  let reviewRepository: Repository<Review>;
  let movieRepository: Repository<Movie>

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [getOrmModule(), ReviewModule],
      providers: [ReviewService, ReviewRepository, MovieRepository],
    }).compile();

    reviewService = moduleRef.get<ReviewService>(ReviewService);
    reviewRepository = moduleRef.get<ReviewRepository>(ReviewRepository);
    movieRepository = moduleRef.get<MovieRepository>(MovieRepository);
  });

  beforeEach(async () => {
    await reviewRepository.clear();
    await movieRepository.clear();
  });

  it('영화의 리뷰를 등록할 수 있다.', async () => {
    // given
    const expectedContent = '이 영화 최고에요!!!!';
    const movie = await movieRepository.save(MovieTestFactory.create());
    const request = ReviewTestFactory.createRequest(expectedContent, movie.id);

    // when
    await reviewService.register(request);

    // then
    const result = await reviewRepository.findOne();
    expect(result.content).toBe(expectedContent);
  });

  it('리뷰를 삭제할 수 있다.', async () => {
    // given
    const movie = await movieRepository.save(MovieTestFactory.create());
    const review = await reviewRepository.save(
      ReviewTestFactory.create('하하하', movie),
    );

    // when
    await reviewService.remove(review.id);

    // then
    const result = await reviewRepository.findOne(review.id);
    expect(result).toBeUndefined();
  })
})
