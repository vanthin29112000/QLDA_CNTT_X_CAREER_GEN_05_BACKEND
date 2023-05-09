import * as mongoose from 'mongoose';

export const ProductScheme = new mongoose.Schema(
  {
    name: { type: String, required: true },
    desc: {
      type: String,
      required: false
    },
    images: {
      type: Array
    },
    countInStock: Number,
    countSold: Number,
    category: Array,
    website: String,
    effectiveDate: {
      type: Date,
      require: true
    },
    expirationDate: {
      type: Date,
      require: true
    },
    price: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      require: true
    },
    isSpecial: { type: Boolean, default: false },
    isShowSlider: { type: Boolean, default: false }
  },
  { timestamps: true }
);
