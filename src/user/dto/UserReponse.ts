import { Exclude } from 'class-transformer';
import { User } from '../entity/User.entity';

export class UserResponse {
  private readonly id: number;
  private readonly email: string;
  private readonly name: string;
  @Exclude() private readonly password: string;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.password = user.password;
  }
}
