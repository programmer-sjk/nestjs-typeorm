import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../src/user/user.service';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { UserRepository } from '../../src/user/user.repository';
import { Repository } from 'typeorm';
import { User } from '../../src/user/entity/User.entity';
import { CreateUserDto } from '../../src/user/dto/CreateUserDto';
import { UserModule } from '../../src/user/user.module';
import { getPgTypeOrmModule } from '../../getPgRealOrmModule';

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
    console.log(userRepository)
    await userRepository.clear();
  });

  afterAll(async () => {
    await moduleRef.close();
  });

  it('service를 불러올 수 있다.', () => {
    expect(userService).toBeDefined();
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
});
