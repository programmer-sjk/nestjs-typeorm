import { Test } from '@nestjs/testing';
import { UserService } from './../../../module/user/user.service';
import { Repository } from 'typeorm';
import { Users } from './../../../common/entity/User.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserAddRequest } from './../../../module/user/dto/UserAddRequest';
import { UserModule } from './../../../module/user/user.module';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<Users>
  
  beforeEach(async () => {
    // const moduleRef = await Test.createTestingModule({
    //   imports: [UserModule],
    //   providers: [],
    // }).compile();
  });
  
  describe('findAll', () => {
    it('simple test', () => {
      expect(1).toBe(1);
    });
  });
});