import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { Users } from '../../../common/entity/User.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserAddRequest } from '../../../module/user/dto/UserAddRequest';
import { UserModule } from '../../../module/user/user.module';
import { TestTypeOrmModule } from '../../../typeorm/TestTypeOrmModule';
import { UserController } from './../../../module/user/user.controller';
import { ResponseEntity } from './../../../common/response/ResponseEntity';
import { UserService } from './../../../module/user/user.service';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

describe('UserControler', () => {
  let app: INestApplication;
  let userController: UserController;
  let userRepository: Repository<Users>
  
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        TestTypeOrmModule,
        UserModule,
      ],
      providers: [
        UserService,
        {
          provide: 'UsersRepository',
          useClass: Repository,
        }
      ],
    }).compile();

    userRepository = moduleRef.get(getRepositoryToken(Users))
    app = moduleRef.createNestApplication();
    await app.init();

  });
  
  beforeEach(async () => {
    await userRepository.clear();
  })

  // afterAll(async () => {
  //   console.log(moduleRef)
  //   await moduleRef.close()
  // })

  describe('users (e2e)', () => {
    it('사용자를 조회할 수 있다.', async () => {
      // given
      const userDto = new UserAddRequest('서정국', 33);
      const user = await userRepository.save(Users.of(userDto))

      // when
      const results = await request(app.getHttpServer()).get('/user')


      // then
      expect(results.body.data[0].age).toBe(user.age)
      expect(results.body.data[0].name).toBe(user.name)
    });
    
    
    it('사용자를 추가할 수 있다.', async () => {
      // given
      const userDto = new UserAddRequest('서정국', 33);

      // when
      
    });
  });
});