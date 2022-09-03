import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './../../../module/user/user.service';
import { Repository } from 'typeorm';
import { Users } from './../../../common/entity/User.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserAddRequest } from './../../../module/user/dto/UserAddRequest';
import { UserModule } from './../../../module/user/user.module';
import { RealTypeOrmModule } from './../../../typeorm/RealTypeOrmModule';

describe('UserService', () => {
  let moduleRef: TestingModule;
  let userService: UserService;
  let userRepository: Repository<Users>
  
  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        RealTypeOrmModule,
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

  describe('findAll', () => {
    it('simple test', () => {
      expect(1).toBe(1);
    });

    it('simple test2', async () => {
      // given
      const userDto = new UserAddRequest('서정국', 33);
      const user = await userService.addUser(Users.of(userDto))

      // when
      const results = await userService.getUser();

      // then
      expect(results[0].age).toBe(userDto.age)
      expect(results[0].name).toBe(userDto.name)
    });
  });
});