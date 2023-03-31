import * as mongoose from 'mongoose';

export interface IProduct extends mongoose.Document {
  name: string;
  desc: string;
  images: Array<string>;
  brand: { name: string; img: string };
  category: Array<string>;
  website: string;
  effectiveDate: Date;
  expirationDate: Date;
  price: number;
  countInStock: number;
  isSpecial: boolean;
  countSold: number;
  createdAt: Date;
  updatedAt: Date;
  deleteInfo: {
    user: mongoose.Schema.Types.ObjectId;
    isDelete: boolean;
    dateDelete: Date;
  };
}

export interface IProductRO {
  status: number;
  data: IProduct[];
  // paginationInfo: {
  //   totalProduct: number;
  //   currentPage: number;
  //   pageSize: number;
  // };
}
export interface Pagination {
  page: number;
  limit: number;
}
