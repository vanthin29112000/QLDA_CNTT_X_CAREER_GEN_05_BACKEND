import * as mongoose from 'mongoose';

export const FeedScheme = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String },
    desc: { type: String }
  },
  { timestamps: true }
);
