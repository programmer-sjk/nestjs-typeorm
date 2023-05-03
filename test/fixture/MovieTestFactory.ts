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
}
