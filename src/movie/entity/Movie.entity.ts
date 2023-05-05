import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SubTitleLanguage } from '../enum/SubTitleLanguage';
import { NumericTransformer } from '../../common/util/NumericTransformer';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'enum', enum: SubTitleLanguage })
  subTitleLanguage: SubTitleLanguage;

  @Column()
  madeBy: string;

  @Column()
  filmCompany: string;

  @Column()
  rottenScore: number;

  @Column('decimal', {
    precision: 2,
    scale: 1,
    transformer: new NumericTransformer(),
  })
  imDbScore: number;

  @Column('decimal', {
    precision: 2,
    scale: 1,
    transformer: new NumericTransformer(),
  })
  score: number;

  @Column()
  description: string;

  constructor(
    title: string,
    subTitleLanguage: SubTitleLanguage,
    madeBy: string,
    filmCompany: string,
    rottenScore: number,
    imDbScore: number,
    score: number,
    description: string,
  ) {
    this.title = title;
    this.subTitleLanguage = subTitleLanguage;
    this.madeBy = madeBy;
    this.filmCompany = filmCompany;
    this.rottenScore = rottenScore;
    this.imDbScore = imDbScore;
    this.score = score;
    this.description = description;
  }

  update(
    title: string,
    subTitleLanguage: SubTitleLanguage,
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

  updateScore(rottenScore: number, imDbScore: number, score: number) {
    this.rottenScore = rottenScore;
    this.imDbScore = imDbScore;
    this.score = score;
  }
}
