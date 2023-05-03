import { IsInt, IsNotEmpty, Min } from 'class-validator';
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
  private fileCompany: string;

  @IsInt()
  @Min(0)
  private rottenScore: number;

  @IsInt()
  @Min(0)
  private imDbScore: number;

  @IsInt()
  @Min(0)
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
