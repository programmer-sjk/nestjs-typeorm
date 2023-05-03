import { Movie } from '../entity/Movie.entity';
import { SubTitleLanguage } from '../enum/SubTitleLanguage';

export class CreateMovieRequest {
  private title: string;
  private subTitleLanguage: string;
  private madeBy: string;
  private fileCompany: string;
  private rottenScore: number;
  private imDbScore: number;
  private score: number;
  private description: string;

  toEntity(): Movie {
    return new Movie(
      this.title,
      SubTitleLanguage[this.subTitleLanguage],
      this.madeBy,
      this.fileCompany,
      this.rottenScore,
      this.imDbScore,
      this.score,
      this.description,
    );
  }
}
