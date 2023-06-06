import { EntityRepository, Repository } from 'typeorm';
import { KLMovie } from './KLMovie.entity';

@EntityRepository(KLMovie)
export class IsolationRepository extends Repository<KLMovie> {}
