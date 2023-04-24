import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/User.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(): Promise<string> {
    const users = await this.userRepository.find();
    console.log(users.length);
    return 'findAll';
  }

  find(): string {
    return 'find';
  }

  signUp(): string {
    return 'signUp';
  }
}
