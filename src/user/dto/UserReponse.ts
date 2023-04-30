import { Exclude } from 'class-transformer';
import { User } from '../entity/User.entity';

export class UserResponse {
  private readonly _id: number;
  private readonly _email: string;
  private readonly _name: string;
  @Exclude() private readonly _password: string;

  constructor(user: User) {
    this._id = user.id;
    this._email = user.email;
    this._name = user.name;
    this._password = user.password;
  }

  public get id(): number {
    return this._id;
  }

  public get email(): string {
    return this._email;
  }

  public get name(): string {
    return this._name;
  }
}
