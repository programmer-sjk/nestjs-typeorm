import { Injectable } from '@nestjs/common';
import { IsolationRepository } from './isolation.repository';

@Injectable()
export class IsolationService {
  constructor(private readonly isolationRepository: IsolationRepository) {}

  async test(id: number) {
    return this.isolationRepository.findOne(id);
  }

  async getMovieIds() {
    return this.isolationRepository.query(
      'SELECT idx as id FROM KLMovie ORDER BY RAND() LIMIT 100000',
    );
  }
}
