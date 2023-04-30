import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../src/user/user.service';
import { UserRepository } from '../../src/user/user.repository';
import { Repository } from 'typeorm';
import { User } from '../../src/user/entity/User.entity';
import { CreateUserDto } from '../../src/user/dto/CreateUserDto';
import { UserModule } from '../../src/user/user.module';
import { getPgTypeOrmModule } from '../../getPgRealOrmModule';
import { UserResponse } from '../../src/user/dto/UserReponse';

describe('UserService', () => {
  let moduleRef: TestingModule;
  let userService: UserService;
  let userRepository: Repository<User>;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [getPgTypeOrmModule(), UserModule],
      providers: [UserService, UserRepository],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
    userRepository = moduleRef.get<UserRepository>(UserRepository);
  });

  beforeEach(async () => {
    await userRepository.clear();
  });

  afterAll(async () => {
    await moduleRef.close();
  });

  it('사용자를 등록할 수 있다.', async () => {
    // given
    const request = new CreateUserDto('email@email.com', 'password', 'name');

    // when
    await userService.signUp(request);

    // then
    const users: User[] = await userRepository.find();
    expect(users.length).toBe(1);
  });

  it('전체 사용자를 조회할 수 있다.', async () => {
    // given
    const expectedUser = await userRepository.save(
      new User('email@email.com', 'password', 'name'),
    );
    await userRepository.save(new User('email2@email.com', 'password', 'name'));

    // when
    const users = await userService.findAll();

    // then
    expect(users.length).toBe(2);
    const result: UserResponse = users[0];
    expect(result.id).toBe(expectedUser.id);
    expect(result.email).toBe(expectedUser.email);
  });

  it('특정 사용자를 조회할 수 있다.', async () => {
    // given
    const expectedUser = await userRepository.save(
      new User('email@email.com', 'password', 'name'),
    );

    // when
    const result = await userService.find(expectedUser.id);

    // then
    expect(result.id).toBe(expectedUser.id);
    expect(result.email).toBe(expectedUser.email);
  });
});
