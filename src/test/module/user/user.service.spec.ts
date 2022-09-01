import { Test } from '@nestjs/testing';
import { UserService } from './../../../module/user/user.service';
import { Repository } from 'typeorm';
import { Users } from './../../../common/entity/User.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserModule } from './../../../module/user/user.module';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<Users>
  
  beforeEach(async () => {
    // const moduleRef = await Test.createTestingModule({
    //   imports: [UserModule],
    //   providers: [
    //     UserService,
    //     {
    //       provide: getRepositoryToken(Users),
    //       useClass: Users
    //     },
    //   ],
    // }).compile();
  
    // userService = moduleRef.get<UserService>(UserService);
    // userRepository = moduleRef.get(getRepositoryToken(Users))
  });
  
  describe('findAll', () => {
    it('simple test', () => {
      expect(1).toBe(1);
    });
  });
});