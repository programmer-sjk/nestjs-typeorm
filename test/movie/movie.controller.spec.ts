import { Test, TestingModule } from '@nestjs/testing';
import { MovieService } from '../../src/movie/movie.service';
import { Repository } from 'typeorm';
import { Movie } from '../../src/movie/entity/Movie.entity';
import { getPgTypeOrmModule } from '../../getPgRealOrmModule';
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

describe('MovieController', () => {
  let app: INestApplication;
  let moduleRef: TestingModule;
  let movieService: MovieService;
  let movieRepository: Repository<Movie>;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [getPgTypeOrmModule(), MovieModule],
      providers: [MovieService, MovieRepository],
    }).compile();

    movieService = moduleRef.get<MovieService>(MovieService);
    movieRepository = moduleRef.get<MovieRepository>(MovieRepository);

    app = moduleRef.createNestApplication();

    app.useGlobalInterceptors(
      new ClassSerializerInterceptor(app.get(Reflector)),
    );
    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    await app.init();
  });

  beforeEach(async () => {
    await movieRepository.clear();
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
