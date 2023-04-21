/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
import { Schema } from '@nestjs/mongoose';
export type InvoiceDocument = Invoice & Document
export const InvoiceSchema = new mongoose.Schema({
createdAt: { type: String, required: true, default: Date().toString() },
userID: {type:String},
address :{type:Object({city:String,district:String,state:String,ward:String})},
orderItems :{type:Array({
idP:{type:mongoose.Schema.Types.ObjectId,ref:'Voucher'},
name:String,
qty:Number,
img:String,
price:Number,
money:{type:Number,default:0}})},
statusOrder: { type: String, enum:['newOrder','acceptedOrder','shipping','successful','fail','cancel'] },
totalMoney :{type:Number,default:0}

});
@Schema()
export class Invoice {
save() {
throw new Error('Method not implemented.');
}
createdAt: string;
userID: string;
address:{city:string,district:string,state:string,ward:string};
orderItems:{
  forEach(arg0: (order: any) => void): unknown;idP:mongoose.Types.ObjectId,name:string,qty:number,img:string,price:number,money:number
}
statusOrder: string;
totalMoney: number;
}