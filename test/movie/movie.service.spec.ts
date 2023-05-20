import { Test, TestingModule } from '@nestjs/testing';
import { MustBeEntityError, Repository } from 'typeorm';
import { Movie } from '../../src/movie/entity/Movie.entity';
import { MovieModule } from '../../src/movie/movie.module';
import { MovieRepository } from '../../src/movie/movie.repository';
import { MovieService } from '../../src/movie/movie.service';
import { Review } from '../../src/review/entity/Review.entity';
import { ReviewModule } from '../../src/review/review.module';
import { ReviewRepository } from '../../src/review/review.repository';
import { getTestOrmModule } from '../common/getTestOrmModule';
import { MovieTestFactory } from '../fixture/MovieTestFactory';
import { ReviewTestFactory } from '../fixture/ReviewTestFactory';

describe('MovieService', () => {
  let moduleRef: TestingModule;
  let movieService: MovieService;
  let movieRepository: Repository<Movie>;
  let reviewRepository: Repository<Review>;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [getTestOrmModule(), MovieModule, ReviewModule],
      providers: [MovieService, MovieRepository, ReviewRepository],
    }).compile();

    movieService = moduleRef.get<MovieService>(MovieService);
    movieRepository = moduleRef.get<MovieRepository>(MovieRepository);
    reviewRepository = moduleRef.get<ReviewRepository>(ReviewRepository);
  });

  beforeEach(async () => {
    await movieRepository.clear();
    await reviewRepository.clear();
  });

  it('영화를 등록할 수 있다.', async () => {
    // given
    const expectedTitle = 'us and them';
    const request = MovieTestFactory.createRequest(expectedTitle);

    // when
    await movieService.register(request);

    // then
    const result = await movieRepository.findOne();
    expect(result.title).toBe(expectedTitle);
  });

  it('영화를 전체 조회할 수 있다.', async () => {
    // given
    await movieRepository.save(MovieTestFactory.create());
    const expectedMovie = await movieRepository.save(MovieTestFactory.create());

    // when
    const results = await movieService.findAll();

    // then
    expect(results).toHaveLength(2);
    expect(results[1].id).toBe(expectedMovie.id);
  });

  it('모든 영화와, 각 영화의 관련된 리뷰를 전체 조회할 수 있다.', async () => {
    // given
    const movie = await movieRepository.save(MovieTestFactory.create());
    const review1 = await reviewRepository.save(
      ReviewTestFactory.create('히히', movie),
    );
    const review2 = await reviewRepository.save(
      ReviewTestFactory.create('히히', movie),
    );

    // when
    const results = await movieService.findAllWithReviews();

    // then
    expect(results).toHaveLength(1);
    expect(results[0].id).toBe(movie.id);

    const reviews = results[0].reviews.map((review) => review.id);
    expect(reviews).toHaveLength(2);
    expect(reviews).toContain(review1.id);
    expect(reviews).toContain(review2.id);
  });

  it('특정 영화를 조회할 수 있다.', async () => {
    // given
    const expectedMovie = await movieRepository.save(MovieTestFactory.create());

    // when
    const result = await movieService.find(expectedMovie.id);

    // then
    expect(result.id).toBe(expectedMovie.id);
  });

  it('영화 정보를 수정할 수 있다.', async () => {
    // given
    const expectedMovieTitle = '먼훗날 우리';
    const movie = await movieRepository.save(MovieTestFactory.create());
    const request =
      MovieTestFactory.createUpdateMovieRequest(expectedMovieTitle);

    // when
    await movieService.update(movie.id, request);

    // then
    const result = await movieRepository.findOne(movie.id);
    expect(result.title).toBe(expectedMovieTitle);
  });

  it('영화 평점을 수정할 수 있다.', async () => {
    // given
    const expectedScore = 1.0;
    const movie = await movieRepository.save(MovieTestFactory.create());
    const request = MovieTestFactory.createUpdateMovieScoreRequest(
      expectedScore,
      expectedScore,
      expectedScore,
    );

    // when
    await movieService.updateScore(movie.id, request);

    // then
    const result = await movieRepository.findOne(movie.id);
    expect(result.rottenScore).toBe(expectedScore);
    expect(result.imDbScore).toBe(expectedScore);
    expect(result.score).toBe(expectedScore);
  });

  it('영화를 삭제할 수 있다.', async () => {
    // given
    const movie = await movieRepository.save(MovieTestFactory.create());

    // when
    await movieService.remove(movie.id);

    // then
    const result = await movieRepository.findOne(movie.id);
    expect(result).toBeUndefined();
  });

  it('삭제하려는 영화가 없다면 예외가 발생한다.', async () => {
    // when & then
    await expect(movieService.remove(999)).rejects.toThrowError(
      MustBeEntityError,
    );
  });
});
