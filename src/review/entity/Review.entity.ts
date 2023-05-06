import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Movie } from '../../movie/entity/Movie.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  content: string;

  @ManyToOne(() => Movie, (movie) => movie.reviews)
  movie: Movie;

  constructor(content: string, movie: Movie) {
    this.content = content;
    this.movie = movie;
  }
}
