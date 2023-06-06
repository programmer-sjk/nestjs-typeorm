import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsolationController } from './isolation.controller';
import { IsolationRepository } from './isolation.repository';
import { IsolationService } from './isolation.service';

@Module({
  controllers: [IsolationController],
  providers: [IsolationService],
  imports: [TypeOrmModule.forFeature([IsolationRepository])],
})
export class IsolationModule {}
