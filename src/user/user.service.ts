import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  findAll(): string {
    return 'findAll';
  }

  find(): string {
    return 'find';
  }

  signUp(): string {
    return 'signUp';
  }
}