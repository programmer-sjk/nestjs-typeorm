import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './../../common/entity/User.entity';
import { UserAddRequest } from './dto/UserAddRequest';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>
  ) {}

  getUser(): Promise<Users[]> {
    return this.userRepository.find();
  }

  async addUser(dto: UserAddRequest): Promise<void> {
    await this.userRepository.save(Users.of(dto));
  }
}
