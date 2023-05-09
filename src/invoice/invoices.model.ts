/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
import { Schema } from '@nestjs/mongoose';
import { ArrayNotContains } from 'class-validator';
export type InvoiceDocument = Invoice & Document;
export const InvoiceSchema = new mongoose.Schema({
  createdAt: { type: Date, required: true, default: Date() },
  userID: { type: String },
  phone: { type: String },
  email: { type: String },
  address: {
    type: Object({
      mainAddress: String,
      district: { id: String, name: String },
      ward: { id: String, name: String },
      city: { id: String, name: String }
    })
  },
  orderItems: {
    type: Array({
      idP: { type: mongoose.Schema.Types.ObjectId },
      effectiveDate: {
        type: Date
      },
      expirationDate: {
        type: Date
      },
      name: String,
      qty: Number,
      img: String,
      price: Number,
      code: {
        type: Array({
          name: String,
          isUsed: Boolean
        })
      }
    })
  },
  statusOrder: {
    type: String,
    enum: [
      'newOrder',
      'acceptedOrder',
      'shipping',
      'successful',
      'fail',
      'cancel'
    ]
  },
  paymentType: {
    type: String,
    enum: ['momo', 'zalopay', 'visa', 'atm']
  },

  totalMoney: { type: Number, default: 0 }
});
@Schema()
export class Invoice {
  save() {
    throw new Error('Method not implemented.');
  }
  createdAt: Date;
  userID: string;
  phone: string;
  email: string;

  address: { city: string; district: string; state: string; ward: string };
  orderItems: {
    idP: mongoose.Types.ObjectId;
    name: string;
    qty: number;
    img: string;
    price: number;
    effectiveDate: Date;
    expirationDate: Date;
    money: number;
    code: { name: string; isUsed: boolean }[];
  }[];
  statusOrder: string;
  paymentType: string;
  totalMoney: number;
}
