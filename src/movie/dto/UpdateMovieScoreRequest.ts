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
}
