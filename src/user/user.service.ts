import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserRequest } from './dto/CreateUserRequest';
import { UserResponse } from './dto/UserReponse';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(): Promise<UserResponse[]> {
    const users = await this.userRepository.find();
    return users.map((user) => new UserResponse(user));
  }

  async find(id: number): Promise<UserResponse> {
    const user = await this.userRepository.findOne(id);
    return new UserResponse(user);
  }

  async signUp(request: CreateUserRequest): Promise<void> {
    await this.userRepository.save(request.toEntity());
  }
}
