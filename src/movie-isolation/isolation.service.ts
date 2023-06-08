import { Injectable } from '@nestjs/common';
import { IsolationRepository } from './isolation.repository';
import { IsolationLevel, Transactional } from 'typeorm-transactional-cls-hooked';

@Injectable()
export class IsolationService {
  constructor(private readonly isolationRepository: IsolationRepository) {}

  async test(id: number) {
    return this.isolationRepository.findOne(id);
  }

  @Transactional({ isolationLevel: IsolationLevel.READ_COMMITTED })
  // @Transactional()
  async getMovieIds() {
    return this.isolationRepository.query(
      'SELECT idx as id FROM KLMovie ORDER BY RAND() LIMIT 100000',
    );
  }
}
