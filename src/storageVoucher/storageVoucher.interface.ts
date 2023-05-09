import * as mongoose from 'mongoose';

export interface IStorageVoucher extends mongoose.Document {
  productID: mongoose.Types.ObjectId;
  code: Array<string>;
  used: Array<string>;
}
