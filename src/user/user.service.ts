import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/User.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/CreateUserDto';
import { UserResponse } from './dto/UserReponse';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(): Promise<UserResponse[]> {
    const users = await this.userRepository.find();
    return users.map((user) => new UserResponse(user));
  }

  async find(id: number): Promise<User> {
    return await this.userRepository.findOne(id);
  }

  async signUp(request: CreateUserDto): Promise<void> {
    await this.userRepository.save(request.toEntity());
  }
}
