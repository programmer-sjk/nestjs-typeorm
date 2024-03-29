import { IsNotEmpty } from 'class-validator';
import { Movie } from '../entity/Movie.entity';
import { SubTitleLanguage } from '../enum/SubTitleLanguage';

export class CreateMovieRequest {
  @IsNotEmpty()
  private title: string;

  @IsNotEmpty()
  private subTitleLanguage: string;

  @IsNotEmpty()
  private madeBy: string;

  @IsNotEmpty()
  private filmCompany: string;

  private description: string;

  constructor(
    title: string,
    subTitleLanguage: string,
    madeBy: string,
    filmCompany: string,
    description: string,
  ) {
    this.title = title;
    this.subTitleLanguage = subTitleLanguage;
    this.madeBy = madeBy;
    this.filmCompany = filmCompany;
    this.description = description;
  }

  toEntity(): Movie {
    return new Movie(
      this.title,
      SubTitleLanguage[this.subTitleLanguage],
      this.madeBy,
      this.filmCompany,
      this.description,
    );
  }
}
