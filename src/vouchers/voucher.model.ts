import * as mongoose from 'mongoose';
import { Type } from 'class-transformer';
import { Schema } from '@nestjs/mongoose';
export type VoucherDocument = Voucher & Document
export const VoucherSchema = new mongoose.Schema({
  createdAt: { type: String, required: false, default: Date().toString() },
  updatedAt: { type: String, required: false, default: 'no-updated verion' },
  name: { type: String, required: false },
  hotline: { type: String, required: false },
  website: { type: String, required: false },
  description: { type: String, required: false },
  content: { type: String, required: false },
  effectiveDate: { type: String, required: false },
  expirationDate: { type: String, required: false },
  price: { type: Number, required: false },
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
