import { EntityRepository, Repository } from 'typeorm';
import { Review } from './entity/Review.entity';

@EntityRepository(Review)
export class ReviewRepository extends Repository<Review> {}
