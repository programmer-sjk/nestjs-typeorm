import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'test',
      password: 'test',
      database: 'mysql',
      entities: [],
      synchronize: true,
    })
  ],
  providers: [],
  exports: []
})
export class RealTypeOrmModule {}