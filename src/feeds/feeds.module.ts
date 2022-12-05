import { FeedsController } from './feeds.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { FeedScheme } from './feeds.model';
import { FeedsService } from './feeds.service';

@Module({
	imports :[ MongooseModule.forFeature([{name: 'feed', schema: FeedScheme}])],
	controllers: [FeedsController],
	providers: [ FeedsService]
})
export class FeedsModule {}
