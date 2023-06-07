import { Controller, Get } from '@nestjs/common';
import { IsolationService } from './isolation.service';

@Controller('isolation')
export class IsolationController {
  constructor(private readonly isolationService: IsolationService) {}

  @Get()
  async test(): Promise<void> {
    const movieIds = await this.isolationService.getMovieIds();

    console.time('test');
    for (const id of movieIds) {
      const movie = await this.isolationService.test(id);
    }
    console.timeEnd('test');
  }
}
