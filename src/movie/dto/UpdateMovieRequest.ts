import { IsNotEmpty } from 'class-validator';

export class UpdateMovieRequest {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  subTitleLanguage: string;

  @IsNotEmpty()
  madeBy: string;

  @IsNotEmpty()
  filmCompany: string;

  description: string;

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
}
