import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { User } from './../../common/entity/User.entity';

@Injectable()
export class UserService {
  constructor(
    private manager: EntityManager,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  getUser(): Promise<User[]> {
    return this.userRepository.find();
  }
}
