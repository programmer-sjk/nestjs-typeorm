import { Test, TestingModule } from '@nestjs/testing';
import { MovieService } from '../../src/movie/movie.service';
import { Repository } from 'typeorm';
import { Movie } from '../../src/movie/entity/Movie.entity';
import { MovieModule } from '../../src/movie/movie.module';
import { MovieRepository } from '../../src/movie/movie.repository';
import {
  ClassSerializerInterceptor,
  HttpStatus,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { MovieTestFactory } from '../fixture/MovieTestFactory';
import * as request from 'supertest';
import { MovieResponse } from '../../src/movie/dto/MovieResponse';
import { ReviewRepository } from '../../src/review/review.repository';
import { ReviewModule } from '../../src/review/review.module';
import { ReviewTestFactory } from '../fixture/ReviewTestFactory';
import { getTestOrmModule } from '../common/getTestOrmModule';

describe('MovieController', () => {
  let app: INestApplication;
  let moduleRef: TestingModule;
  let movieRepository: Repository<Movie>;
  let reviewRepository: ReviewRepository;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [getTestOrmModule(), MovieModule, ReviewModule],
      providers: [MovieService, MovieRepository, ReviewRepository],
    }).compile();

    movieRepository = moduleRef.get<MovieRepository>(MovieRepository);
    reviewRepository = moduleRef.get<ReviewRepository>(ReviewRepository);

    app = moduleRef.createNestApplication();

    app.useGlobalInterceptors(
      new ClassSerializerInterceptor(app.get(Reflector)),
    );
    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    await app.init();
  });

  beforeEach(async () => {
    await movieRepository.clear();
    await reviewRepository.clear();
  });

  it('영화를 등록할 수 있다.', async () => {
    // given
    const expectedTitle = 'us and them';
    const req = MovieTestFactory.createRequest(expectedTitle);

    // when
    await request(app.getHttpServer())
      .post('/movie')
      .send(req)
      .expect(HttpStatus.CREATED);

    // then
    const result = await movieRepository.findOne();
    expect(result.title).toBe(expectedTitle);
  });

  it('영화를 전체 조회할 수 있다.', async () => {
    // given
    const expectedMovie = await movieRepository.save(MovieTestFactory.create());
    await movieRepository.save(MovieTestFactory.create());

    // when
    const response = await request(app.getHttpServer())
      .get('/movie')
      .expect(HttpStatus.OK);

    // then
    expect(response.body).toHaveLength(2);

    const result = response.body[0];
    expect(result.id).toBe(expectedMovie.id);
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
    const response = await request(app.getHttpServer())
      .get('/movie/review')
      .expect(HttpStatus.OK);

    // then
    const result = response.body[0];
    expect(result.id).toBe(movie.id);

    const reviews = result.reviews.map((review) => review.id);
    expect(reviews).toHaveLength(2);
    expect(reviews).toContain(review1.id);
    expect(reviews).toContain(review2.id);
  });

  it('특정 영화를 조회할 수 있다.', async () => {
    // given
    const expectedMovie = await movieRepository.save(MovieTestFactory.create());

    // when
    const response = await request(app.getHttpServer())
      .get(`/movie/${expectedMovie.id}`)
      .expect(HttpStatus.OK);

    // then
    const result: MovieResponse = response.body;
    expect(result.id).toBe(expectedMovie.id);
  });

  it('영화 정보를 수정할 수 있다.', async () => {
    // given
    const expectedMovieTitle = '먼훗날 우리';
    const movie = await movieRepository.save(MovieTestFactory.create());
    const req = MovieTestFactory.createUpdateMovieRequest(expectedMovieTitle);

    // when
    await request(app.getHttpServer())
      .patch(`/movie/${movie.id}`)
      .send(req)
      .expect(HttpStatus.OK);

    // then
    const result = await movieRepository.findOne(movie.id);
    expect(result.title).toBe(expectedMovieTitle);
  });

  it('영화 평점을 수정할 수 있다.', async () => {
    // given
    const expectedScore = 1.0;
    const movie = await movieRepository.save(MovieTestFactory.create());
    const req = MovieTestFactory.createUpdateMovieScoreRequest(
      expectedScore,
      expectedScore,
      expectedScore,
    );

    // when
    await request(app.getHttpServer())
      .patch(`/movie/${movie.id}/score`)
      .send(req)
      .expect(HttpStatus.OK);

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
    await request(app.getHttpServer())
      .delete(`/movie/${movie.id}`)
      .send()
      .expect(HttpStatus.OK);

    // then
    const result = await movieRepository.findOne(movie.id);
    expect(result).toBeUndefined();
  });
});
