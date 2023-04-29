import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';

export function getPgTypeOrmModule() {
  return TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'test',
    entities: [path.join(__dirname, 'src/**/*.entity.{ts,js}')],
    synchronize: true,
  });
}

