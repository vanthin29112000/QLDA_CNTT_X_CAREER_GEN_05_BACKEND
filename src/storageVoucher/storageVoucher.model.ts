import * as mongoose from 'mongoose';

export const storageVoucher = new mongoose.Schema(
  {
    productID: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },
    code: {
      type: Array
    },

    used: {
      type: Array
    }
  },
  { timestamps: true }
);
