import { IsInt, Min } from 'class-validator';

export class UpdateMovieScoreRequest {
  @IsInt()
  @Min(0)
  rottenScore: number;

  @IsInt()
  @Min(0)
  imDbScore: number;

  @IsInt()
  @Min(0)
  score: number;

  constructor(rottenScore: number, imDbScore: number, score: number) {
    this.rottenScore = rottenScore;
    this.imDbScore = imDbScore;
    this.score = score;
  }
}
