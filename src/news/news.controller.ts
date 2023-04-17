import { Controller, Body, Get, Put } from '@nestjs/common';
import { Delete, Param, Post } from '@nestjs/common/decorators';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Put('/')
  async AddNews(
    @Body('imgThumbnail') imgThumbnail: string,
    @Body('title') title: string,
    @Body('type') type: string,
    @Body('status') status: string,
    @Body('content') content: string
  ) {
    const newItem = await this.newsService.AddNews(
      imgThumbnail,
      title,
      type,
      status,
      content
    );
    return newItem;
  }

  @Get('/')
  async GetAllNews() {
    const news = await this.newsService.GetAllNews();
    return news;
  }

  @Get('/latest')
  async GetLatestNews() {
    const news = await this.newsService.getLatestNews();
    return news;
  }

  @Get('/:id')
  async GetNewID(@Param() params) {
    const newItem = await this.newsService.GetNewID(params.id);
    return newItem;
  }

  @Get('view/:id')
  async GetViewsNewID(@Param() params) {
    const newItem = await this.newsService.GetViewNewID(params.id);
    return newItem;
  }

  @Post('/:id')
  async UpdateNewItem(
    @Param() param,
    @Body('imgThumbnail') imgThumbnail: string,
    @Body('title') title: string,
    @Body('type') type: string,
    @Body('status') status: string,
    @Body('content') content: string
  ) {
    console.log('valueAfter', imgThumbnail, title, type, status, content);

    const news = await this.newsService.updateNewItem(
      param.id,
      imgThumbnail,
      title,
      type,
      status,
      content
    );

    return news;
  }

  @Delete('/:id')
  async deleteNew(@Param() param) {
    const news = await this.newsService.deleteNew(param.id);
    return news;
  }
}
