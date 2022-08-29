import { Module } from '@nestjs/common';
import { RealTypeOrmModule } from '../typeorm/RealTypeOrmModule';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    RealTypeOrmModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
