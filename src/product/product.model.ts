import * as mongoose from 'mongoose';

export const ProductScheme = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: {
      name: { type: String, required: true },
      img: { type: String, required: true }
    },
    desc: {
      type: String,
      required: false
    },
    images: {
      type: Array
    },
    countInStock: Number,
    countSold: { type: Number, default: 0 },
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
      type: Number
    },
    quantity: {
      type: Number,
      require: true
    },
    deleteInfo: {
      user: { type: mongoose.Schema.Types.ObjectId, default: null },
      isDelete: { type: Boolean, default: false },
      dateDelete: { type: Date, default: null }
    },
    isSpecial: { type: Boolean, default: false },
    isShowSlider: { type: Boolean, default: false },
    userManual: { type: String, default: false },
    rules: { type: String, default: false }
  },
  { timestamps: true }
);
