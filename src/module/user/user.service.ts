import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    private manager: EntityManager
  ) {}
}
