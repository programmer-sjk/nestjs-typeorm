import { IsNotEmpty, MaxLength } from 'class-validator';
import { User } from '../entity/User.entity';

export class CreateUserDto {
  @IsNotEmpty()
  private email: string;

  @IsNotEmpty()
  private password: string;

  @IsNotEmpty()
  @MaxLength(10)
  private name: string;

  toEntity(): User {
    return new User(this.email, this.password, this.name);
  }
}
