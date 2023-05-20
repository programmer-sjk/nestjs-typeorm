import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from '../../../getOrmConfig';

export function getPgTypeOrmModule() {
  return TypeOrmModule.forRoot(ormConfig);
}
