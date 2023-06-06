import * as common from '@nestjs/common';
import { IsolationService } from './isolation.service';

@common.Controller('isolation')
export class IsolationController {
  constructor(private readonly isolationService: IsolationService) {}

  @common.Get()
  async test(): Promise<void> {
    return await this.isolationService.test();
  }
}
