import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './../../../module/user/user.service';
import { Repository } from 'typeorm';
import { Users } from './../../../common/entity/User.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserAddRequest } from './../../../module/user/dto/UserAddRequest';
import { UserModule } from './../../../module/user/user.module';
import { TestTypeOrmModule } from './../../../typeorm/TestTypeOrmModule';

describe('UserService', () => {
  let moduleRef: TestingModule;
  let userService: UserService;
  let userRepository: Repository<Users>
  
  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        TestTypeOrmModule,
        UserModule
      ],
      providers: [],
    }).compile();

    userService = moduleRef.get<UserService>(UserService)
    userRepository = moduleRef.get(getRepositoryToken(Users))
  });
  
  beforeEach(async () => {
    await userRepository.clear();
  })

  afterAll(async () => {
    await moduleRef.close()
  })

  describe('users (integration)', () => {
    it('사용자를 조회할 수 있다.', async () => {
      // given
      const userDto = new UserAddRequest('서정국', 33);
      const user = await userRepository.save(Users.of(userDto))

      // when
      const results = await userService.getUser();

      // then
      expect(results[0].age).toBe(user.age)
      expect(results[0].name).toBe(user.name)
    });
    
    it('사용자를 추가할 수 있다.', async () => {
      // given
      const userDto = new UserAddRequest('서정국', 33);

      // when
      await userService.addUser(Users.of(userDto))

      // then
      const results = await userRepository.find();
      expect(results[0].age).toBe(userDto.age)
      expect(results[0].name).toBe(userDto.name)
    });
  });
});