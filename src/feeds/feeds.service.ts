import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FeedPagination, IFeed, IFeedtRO } from './feeds.interface';
import { Model } from 'mongoose';
import { CreateFeedDto } from './dto/createFeed.dto';


@Injectable()
export class FeedsService {
	constructor(@InjectModel('feed') private feedModel: Model<IFeed>){}


		async getFeed(): Promise<IFeed[]>{
			return await this.feedModel.find().limit(5)
		}

		async create(createProductDto: CreateFeedDto): Promise<IFeed> {
      const createFeed = new this.feedModel(createProductDto);
      return createFeed.save();
    
		}
		
    async findManyWithPagination(pagination: FeedPagination): Promise<IFeedtRO>{
      let {page, limit} = pagination
      page <=  0 ? page = 1 : page
      const ProductSkip:number =(page -1) *limit
      const totalProduct = await this.feedModel.find()
      const data =  await this.feedModel.find().skip(ProductSkip).limit(limit)
      const paginationInfo = {
        totalProduct : totalProduct.length,
        pageSize: limit,
        currentPage: page
      }
      return {
              status: 200,
              data: data,
              paginationInfo}
    }
}