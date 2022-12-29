import * as mongoose from 'mongoose';
import { Type } from 'class-transformer';
import { Schema } from '@nestjs/mongoose';
export type VoucherDocument = Voucher & Document
export const UserSchema = new mongoose.Schema({
  createdAt: { type: String, required: false, default: Date().toString() },
  updatedAt: { type: String, required: false, default: 'no-updated verion' },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  gender: { type: Boolean, required: true },
  birthday: { type: String, required: false },
  hotline: { type: String, required: false },
});
@Schema()
export class Voucher  {
  save() {
    throw new Error('Method not implemented.');
  }
  createdAt: string;
  name:string
  id: string;
  updatedAt: string;
  hotline: string;
  website: string;
  description: string;
  content: string;
  effectiveDate: string;
  expirationDate: string;
  price: number;
}