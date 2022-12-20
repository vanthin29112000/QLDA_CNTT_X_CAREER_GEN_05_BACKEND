import * as mongoose from 'mongoose';

export interface ICartItem extends mongoose.Document {
  userId: string;
  productId: string;
  quantity: number;
  isCheckout: 0 | 1;
}
