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
      5,
      5,
      5,
      'description',
    );
  }

  static createUpdateMovieRequest() {
    return new UpdateMovieRequest(
      '먼훗날우리',
      'EN',
      '영화제작사',
      '이영화 최고',
    );
  }

  static createUpdateMovieScoreRequest() {
    return new UpdateMovieScoreRequest(5.0, 5.0, 5.0);
  }
}
