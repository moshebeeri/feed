import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FeedService } from './feed.service';
import { CreateFeedDto } from './dto/create-feed.dto';
import { UpdateFeedDto } from './dto/update-feed.dto';

@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}


  @Get(':id/:pageIndex/:pageSize')
  findOne(@Param('id') id: string, @Param('pageIndex') pageIndex: number, @Param('pageSize') pageSize: number) {
    return this.feedService.paginatedUserFeed(id, pageIndex, pageSize);
  }

}
