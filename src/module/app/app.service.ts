import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    private manager: EntityManager
  ) {}

  async dbTest(): Promise<string> {
    const result = await this.manager.query('show tables')
    console.log(result)
    return 'Hello World!';
  }
}
