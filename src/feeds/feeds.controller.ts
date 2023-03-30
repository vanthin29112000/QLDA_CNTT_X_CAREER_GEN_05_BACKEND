import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Post,
  Query
} from '@nestjs/common';
import { CreateFeedDto } from './dto/createFeed.dto';
import { IFeed } from './feeds.interface';
import { FeedsService } from './feeds.service';

@Controller('feeds')
export class FeedsController {
  constructor(private readonly feedService: FeedsService) {}

  @Get()
  async getProductPagination(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number
  ) {
    return await this.feedService.findManyWithPagination({ page, limit });
  }

  @Post()
  createFeed(@Body() createFeedDto: CreateFeedDto): Promise<IFeed> {
    return this.feedService.create(createFeedDto);
  }
}
