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

  @IsNotEmpty()
  description: string;

  constructor(
    title: string,
    subTitleLanguage: string,
    filmCompany: string,
    description: string,
  ) {
    this.title = title;
    this.subTitleLanguage = subTitleLanguage;
    this.filmCompany = filmCompany;
    this.description = description;
  }
}
