import { Movie } from '../entity/Movie.entity';
import { SubTitleLanguage } from '../enum/SubTitleLanguage';

export class UpdateMovieRequest {
  private title: string;
  private subTitleLanguage: string;
  private madeBy: string;
  private filmCompany: string;
  private description: string;

  update(movie: Movie): Movie {
    movie.title = this.title;
    movie.subTitleLanguage = SubTitleLanguage[this.subTitleLanguage];
    movie.madeBy = this.madeBy;
    movie.filmCompany = this.filmCompany;
    movie.description = this.description;

    return movie;
  }
}
