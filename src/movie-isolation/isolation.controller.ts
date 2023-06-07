import { Controller, Get } from '@nestjs/common';
import { IsolationService } from './isolation.service';

@Controller('isolation')
export class IsolationController {
  constructor(private readonly isolationService: IsolationService) {}

  @Get()
  async test(): Promise<void> {
    return await this.isolationService.test();
  }
}
