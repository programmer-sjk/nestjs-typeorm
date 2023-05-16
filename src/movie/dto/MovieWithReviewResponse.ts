import { Exclude, Expose } from 'class-transformer';
import { SubTitleLanguage } from '../enum/SubTitleLanguage';
import { Movie } from '../entity/Movie.entity';
import { Review } from '../../review/entity/Review.entity';

export class MovieWithReviewResponse {
  @Exclude() private _id: number;
  @Exclude() private _title: string;
  @Exclude() private _subTitleLanguage: SubTitleLanguage;
  @Exclude() private _madeBy: string;
  @Exclude() private _filmCompany: string;
  @Exclude() private _rottenScore: number;
  @Exclude() private _imDbStar: number;
  @Exclude() private _star: number;
  @Exclude() private _description: string;
  @Exclude() private _reviews: Review[];

  constructor(movie: Movie) {
    this._id = movie.id;
    this._title = movie.title;
    this._subTitleLanguage = movie.subTitleLanguage;
    this._madeBy = movie.madeBy;
    this._filmCompany = movie.filmCompany;
    this._rottenScore = movie.rottenScore;
    this._imDbStar = movie.imDbScore;
    this._star = movie.score;
    this._description = movie.description;
    this._reviews = movie.reviews;
  }

  @Expose()
  public get id() {
    return this._id;
  }

  @Expose()
  public get title() {
    return this._title;
  }

  @Expose()
  public get subTitleLanguage() {
    return this._subTitleLanguage;
  }

  @Expose()
  public get madeBy() {
    return this._madeBy;
  }

  @Expose()
  public get filmCompany() {
    return this._filmCompany;
  }

  @Expose()
  public get rottenScore() {
    return this._rottenScore;
  }

  @Expose()
  public get imDbStar() {
    return this._imDbStar;
  }

  @Expose()
  public get star() {
    return this._star;
  }

  @Expose()
  public get description() {
    return this._description;
  }

  @Expose()
  public get reviews() {
    return this._reviews;
  }
}
