import { Module } from '@nestjs/common';
import { RealTypeOrmModule } from './../../typeorm/RealTypeOrmModule';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    RealTypeOrmModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
