import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewRequest } from './dto/CreateReviewRequest';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  async register(@Body() request: CreateReviewRequest): Promise<void> {
    await this.reviewService.register(request);
  }

  @Delete(':id')
  async remove(@Param() id: number): Promise<void> {
    await this.reviewService.remove(id);
  }
}
