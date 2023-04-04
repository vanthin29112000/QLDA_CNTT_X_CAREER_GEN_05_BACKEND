import * as mongoose from 'mongoose';
export const NewsSchema = new mongoose.Schema({
  imgThumbnail: { type: String, required: true },
  title: { type: String, required: true },
  type: { type: String, required: true },
  status: { type: String, required: true },
  content: { type: String, required: true },
  dateSubmit: { type: Date, default: Date().toString() },
  views: { type: Number, default: 0 },
});
export interface News extends mongoose.Document {
  imgThumbnail: String;
  title: String;
  type: String;
  status: String;
  content: String;
  dateSubmit: Date;
  views: Number;
}
