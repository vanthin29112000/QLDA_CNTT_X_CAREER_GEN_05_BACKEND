import * as mongoose from 'mongoose';

export interface IFeed extends mongoose.Document {
  title: string;
  image: string;
  desc: string;

  createAt: Date;
  updateAt: Date;
}
export interface IFeedtRO {
  status: number;
  data: IFeed[];
  paginationInfo: {
    totalProduct: number;
    currentPage: number;
    pageSize: number;
  };
}
export interface FeedPagination {
  page: number;
  limit: number;
}
