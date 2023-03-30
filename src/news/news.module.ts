import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NewsController } from './news.controller';
import { NewsSchema } from './news.model';
import { NewsService } from './news.service';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'news',
        schema: NewsSchema,
      },
    ]),
  ],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
