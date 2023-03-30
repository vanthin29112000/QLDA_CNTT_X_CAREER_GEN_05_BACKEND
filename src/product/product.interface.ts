import * as mongoose from 'mongoose';

export interface IProduct extends mongoose.Document {
  name: string;
  desc: string;
  image: { mainImg: string; moreImg: Array<string> };
  brand: { name: string; img: string };
  category: Array<string>;
  website: string;
  effectiveDate: Date;
  expirationDate: Date;
  price: number;
  quantity: number;
  isSpecial: boolean;

  createdAt: Date;
  updatedAt: Date;
}

export interface IProductRO {
  status: number;
  data: IProduct[];
  paginationInfo: {
    totalProduct: number;
    currentPage: number;
    pageSize: number;
  };
}
export interface Pagination {
  page: number;
  limit: number;
}
