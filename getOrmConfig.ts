import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';

export const ormConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'wjdrnr@2120',
  database: 'test',
  entities: [path.join(__dirname, '../../**/*.entity.{ts,js}')],
  synchronize: true,
  logging: true,
};

console.log(path.join(__dirname, '../../**/*.entity.{ts,js}'))
