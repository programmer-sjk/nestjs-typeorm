import { Injectable } from '@nestjs/common';
import { IsolationRepository } from './isolation.repository';

@Injectable()
export class IsolationService {
  constructor(private readonly isolationRepository: IsolationRepository) {}

  async test(): Promise<void> {
    await this.isolationRepository.find();
  }

  async getMovieIds() {
    return this.isolationRepository.query(
      'SELECT idx as id FROM KLMovie ORDER BY RAND() LIMIT 100',
    );
  }
}
