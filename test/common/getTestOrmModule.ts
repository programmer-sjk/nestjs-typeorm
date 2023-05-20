import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from '../../getOrmConfig';

export function getTestOrmModule() {
  return TypeOrmModule.forRoot({ ...ormConfig, logging: false });
}
