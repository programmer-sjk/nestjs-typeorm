import { User } from '../entity/User.entity';

export class CreateUserDto {
  private email: string;
  private password: string;
  private name: string;

  toEntity(): User {
    return new User(this.email, this.password, this.name);
  }
}
