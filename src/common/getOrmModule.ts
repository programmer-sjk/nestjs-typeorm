import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from '../../getOrmConfig';

export function getOrmModule() {
  return TypeOrmModule.forRoot(ormConfig);
}
