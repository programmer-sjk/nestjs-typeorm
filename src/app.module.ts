import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MovieModule } from './movie/movie.module';
import { getPgTypeOrmModule } from './common/orm-module/getPgRealOrmModule';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [getPgTypeOrmModule(), UserModule, MovieModule, ReviewModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
