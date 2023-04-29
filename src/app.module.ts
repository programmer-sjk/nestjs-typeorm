import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieModule } from './movie/movie.module';
import { getPgTypeOrmModule } from '../getPgRealOrmModule';

@Module({
  imports: [getPgTypeOrmModule(), UserModule, MovieModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
