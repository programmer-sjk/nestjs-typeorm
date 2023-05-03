import { Movie } from '../entity/Movie.entity';
import { SubTitleLanguage } from '../enum/SubTitleLanguage';

export class CreateMovieRequest {
  private title: string;
  private subTitleLanguage: string;
  private madeBy: string;
  private fileCompany: string;
  private rottenScore: number;
  private imDbStar: number;
  private star: number;
  private description: string;

  toEntity(): Movie {
    return new Movie(
      this.title,
      SubTitleLanguage[this.subTitleLanguage],
      this.madeBy,
      this.fileCompany,
      this.rottenScore,
      this.imDbStar,
      this.star,
      this.description,
    );
  }
}
