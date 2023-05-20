import { Test, TestingModule } from '@nestjs/testing';
import { Movie } from '../../src/movie/entity/Movie.entity';
import { Repository, createConnection, getRepository } from 'typeorm';
import { getOrmModule } from '../../src/common/getRealOrmModule';
import { MovieModule } from '../../src/movie/movie.module';
import { MovieRepository } from '../../src/movie/movie.repository';
import { MovieTestFactory } from '../fixture/MovieTestFactory';
import { Review } from '../../src/review/entity/Review.entity';
import { ReviewRepository } from '../../src/review/review.repository';
import { ReviewModule } from '../../src/review/review.module';
import { ReviewTestFactory } from '../fixture/ReviewTestFactory';
import { getRepositoryToken } from '@nestjs/typeorm';
import path from 'path';

describe('MovieRepository', () => {
  // let movieRepository: Repository<Movie>; 이런 식으로 하면 custom method 인식하지 못하는 문제가..왜..?
  let movieRepository: MovieRepository;
  let reviewRepository: ReviewRepository;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [getOrmModule(), MovieModule, ReviewModule],
      providers: [MovieRepository, ReviewRepository],
    }).compile();

    movieRepository = moduleRef.get<MovieRepository>(MovieRepository);
    reviewRepository = moduleRef.get<ReviewRepository>(ReviewRepository);
  });

  beforeEach(async () => {
    await movieRepository.clear();
    await reviewRepository.clear();
  });

  it('findWithReviews를 호출하면 영화와 연관된 리뷰까지 조회할 수 있다.', async () => {
    // given
    const movie = await movieRepository.save(MovieTestFactory.create());
    const review1 = await reviewRepository.save(
      ReviewTestFactory.create('히히', movie),
    );
    const review2 = await reviewRepository.save(
      ReviewTestFactory.create('히히', movie),
    );

    // when
    const result = (await movieRepository.findWithReviews())[0];
    const reviewIds = result.reviews.map((review) => review.id);

    // then
    expect(result.id).toBe(movie.id);
    expect(result.reviews).toHaveLength(2);
    expect(reviewIds).toContain(review1.id);
    expect(reviewIds).toContain(review2.id);
  });
});
