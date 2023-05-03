import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieRepository } from './movie.repository';

@Module({
  controllers: [MovieController],
  providers: [MovieService],
  imports: [TypeOrmModule.forFeature([MovieRepository])],
})
export class MovieModule {}
