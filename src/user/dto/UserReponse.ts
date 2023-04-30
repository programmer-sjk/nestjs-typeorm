import { Exclude, Expose } from 'class-transformer';
import { User } from '../entity/User.entity';

export class UserResponse {
  @Exclude() private readonly _id: number;
  @Exclude() private readonly _email: string;
  @Exclude() private readonly _name: string;
  @Exclude() private readonly _password: string;

  constructor(user: User) {
    this._id = user.id;
    this._email = user.email;
    this._name = user.name;
    this._password = user.password;
  }

  @Expose()
  public get id(): number {
    return this._id;
  }

  @Expose()
  public get email(): string {
    return this._email;
  }

  @Expose()
  public get name(): string {
    return this._name;
  }
}
