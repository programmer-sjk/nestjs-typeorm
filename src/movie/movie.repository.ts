import { EntityRepository, Repository } from 'typeorm';
import { Movie } from './entity/Movie.entity';

@EntityRepository()
export class MovieRepository extends Repository<Movie> {}
