import { Injectable } from '@nestjs/common';
import { MovieRepository } from './movie.repository';

@Injectable()
export class MovieService {
  constructor(private readonly movieRepository: MovieRepository) {}

  async findAll(): Promise<void> {

  }

  async find(): Promise<void> {

  }

  async register(): Promise<void> {

  }

  async update(): Promise<void> {

  }

  async withDrawal(): Promise<void> {

  }
}
