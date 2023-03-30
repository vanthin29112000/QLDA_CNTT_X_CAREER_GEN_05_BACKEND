import * as mongoose from 'mongoose';

export const CartItemSchema = new mongoose.Schema(
  {
    userId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    productId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    quantity: { type: Number },
    isCheckOut: {
      type: Number,
      enum: [0, 1],
      default: 0
    }
  },
  { timestamps: true }
);
