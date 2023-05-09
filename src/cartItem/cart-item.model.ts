import * as mongoose from 'mongoose';

export const CartItemSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    products: {
      type: Array({
        productId: { type: String },
        quantity: { type: Number }
      }),
      default: []
    },

    isCheckOut: {
      type: Number,
      enum: [0, 1],
      default: 0
    }
  },
  { timestamps: true }
);
