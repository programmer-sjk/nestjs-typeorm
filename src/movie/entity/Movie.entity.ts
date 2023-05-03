import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SubTitleLanguage } from '../enum/SubTitleLanguage';

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

  @Column('decimal', { precision: 2, scale: 1 })
  imDbStar: number;

  @Column('decimal', { precision: 2, scale: 1 })
  star: number;

  @Column()
  description: string;

  constructor(
    title: string,
    subTitleLanguage: string,
    madeBy: string,
    filmCompany: string,
    rottenScore: number,
    imDbStar: number,
    star: number,
    description: string,
  ) {
    this.title = title; 
    this.subTitleLanguage = subTitleLanguage; 
    this.madeBy = madeBy; 
    this.filmCompany = filmCompany;
    this.rottenScore = rottenScore; 
    this.imDbStar = imDbStar; 
    this.star = star; 
    this.description = description; 
  }
}
