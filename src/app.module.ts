import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MovieModule } from './movie/movie.module';
import { getOrmModule } from './common/getRealOrmModule';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [getOrmModule(), UserModule, MovieModule, ReviewModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
