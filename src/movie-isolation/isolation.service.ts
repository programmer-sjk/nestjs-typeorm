import { Injectable } from '@nestjs/common';
import { IsolationRepository } from './isolation.repository';

@Injectable()
export class IsolationService {
  constructor(private readonly isolationRepository: IsolationRepository) {}

  async test(): Promise<void> {
    await this.isolationRepository.find();
  }
}
