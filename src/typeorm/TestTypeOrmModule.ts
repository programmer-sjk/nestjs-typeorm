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
      database: 'test',
      entities: [__dirname + '/../common/entity/**/*.entity.{js,ts}'],
      synchronize: true,
      logging: true
    })
  ],
  providers: [],
  exports: []
})
export class TestTypeOrmModule {}