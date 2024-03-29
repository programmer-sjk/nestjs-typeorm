import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';

export const ormConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'test',
  entities: [path.join(__dirname, './src/**/*.entity.{ts,js}')],
  synchronize: false,
  autoLoadEntities: true,
  logging: true,
};
