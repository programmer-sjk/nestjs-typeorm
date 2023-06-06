import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MovieModule } from './movie/movie.module';
import { getOrmModule } from './common/getOrmModule';
import { ReviewModule } from './review/review.module';
import { IsolationModule } from './movie-isolation/isolation.module';

@Module({
  imports: [
    getOrmModule(),
    UserModule,
    MovieModule,
    ReviewModule,
    IsolationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
