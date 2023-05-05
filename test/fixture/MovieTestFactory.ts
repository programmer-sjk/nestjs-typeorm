import { CreateMovieRequest } from '../../src/movie/dto/CreateMovieRequest';
import { UpdateMovieRequest } from '../../src/movie/dto/UpdateMovieRequest';
import { UpdateMovieScoreRequest } from '../../src/movie/dto/UpdateMovieScoreRequest';
import { Movie } from '../../src/movie/entity/Movie.entity';
import { SubTitleLanguage } from '../../src/movie/enum/SubTitleLanguage';

export class MovieTestFactory {
  static create(): Movie {
    return new Movie(
      'title',
      SubTitleLanguage.EN,
      'madeBy',
      'fileCompany',
      'description',
    );
  }

  static createRequest(title: string): CreateMovieRequest {
    return new CreateMovieRequest(
      title,
      SubTitleLanguage.EN,
      'madeBy',
      'fileCompany',
      'description',
    );
  }

  static createUpdateMovieRequest(title: string) {
    return new UpdateMovieRequest(title, 'EN', '영화제작사', '이영화 최고');
  }

  static createUpdateMovieScoreRequest(
    rottenScore: number,
    imDbScore: number,
    score: number,
  ) {
    return new UpdateMovieScoreRequest(rottenScore, imDbScore, score);
  }
}
