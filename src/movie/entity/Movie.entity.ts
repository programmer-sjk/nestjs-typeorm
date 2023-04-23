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
}
