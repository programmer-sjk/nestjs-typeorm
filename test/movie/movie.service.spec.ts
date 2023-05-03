import { Test, TestingModule } from '@nestjs/testing';
import { MovieService } from '../../src/movie/movie.service';
import { Movie } from '../../src/movie/entity/Movie.entity';
import { Repository } from 'typeorm';
import { getPgTypeOrmModule } from '../../getPgRealOrmModule';
import { MovieModule } from '../../src/movie/movie.module';
import { MovieRepository } from '../../src/movie/movie.repository';
import { MovieTestFactory } from '../fixture/MovieTestFactory';

describe('MovieService', () => {
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
  });

  beforeEach(async () => {
    await movieRepository.clear();
  });

  afterAll(async () => {
    await moduleRef.close();
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

  it('특정 영화를 조회할 수 있다.', async () => {
    // given
    const expectedMovie = await movieRepository.save(MovieTestFactory.create());

    // when
    const result = await movieService.find(expectedMovie.id);

    // then
    expect(result.id).toBe(expectedMovie.id);
  });
});
