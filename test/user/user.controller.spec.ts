import {
  ClassSerializerInterceptor,
  HttpStatus,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { Repository } from 'typeorm';
import { CreateUserRequest } from '../../src/user/dto/CreateUserRequest';
import { UserResponse } from '../../src/user/dto/UserReponse';
import { User } from '../../src/user/entity/User.entity';
import { UserModule } from '../../src/user/user.module';
import { UserRepository } from '../../src/user/user.repository';
import { getTestOrmModule } from '../common/getTestOrmModule';

describe('UserController', () => {
  let app: INestApplication;
  let moduleRef: TestingModule;
  let userRepository: Repository<User>;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [getTestOrmModule(), UserModule],
      providers: [UserRepository],
    }).compile();

    userRepository = moduleRef.get<UserRepository>(UserRepository);
    app = moduleRef.createNestApplication();

    app.useGlobalInterceptors(
      new ClassSerializerInterceptor(app.get(Reflector)),
    );
    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    await app.init();
  });

  beforeEach(async () => {
    await userRepository.clear();
  });

  it('사용자를 등록할 수 있다', async () => {
    // given
    const expectedEmail = 'email@email.com';
    const req = new CreateUserRequest(expectedEmail, 'password', 'name');

    // when
    await request(app.getHttpServer())
      .post('/user')
      .send(req)
      .expect(HttpStatus.CREATED);

    // then
    const result = await userRepository.findOne();
    expect(result.email).toBe(expectedEmail);
  });

  it('전체 사용자를 조회할 수 있다.', async () => {
    // given
    const expectedUser = await userRepository.save(
      new User('email@email.com', 'password', 'name'),
    );
    await userRepository.save(new User('email2@email.com', 'password', 'name'));

    // when
    const response = await request(app.getHttpServer())
      .get('/user')
      .expect(HttpStatus.OK);

    const result = response.body[0];
    // then
    expect(result.id).toBe(expectedUser.id);
    expect(result.email).toBe(expectedUser.email);
  });

  it('특정 사용자를 조회할 수 있다.', async () => {
    // given
    const expectedUser = await userRepository.save(
      new User('email@email.com', 'password', 'name'),
    );

    // when
    const response = await request(app.getHttpServer())
      .get(`/user/${expectedUser.id}`)
      .expect(HttpStatus.OK);

    // then
    const result: UserResponse = response.body;
    expect(result.id).toBe(expectedUser.id);
    expect(result.email).toBe(expectedUser.email);
  });
});
