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
}
