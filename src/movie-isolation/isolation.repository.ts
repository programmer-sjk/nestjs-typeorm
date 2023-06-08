import { EntityRepository } from 'typeorm';
import { KLMovie } from './KLMovie.entity';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

@EntityRepository(KLMovie)
export class IsolationRepository extends BaseRepository<KLMovie> {}
