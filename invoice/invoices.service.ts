/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Invoice } from './invoices.model';
import { CreateInvoiceDto } from './dto/createInvoice.dto';
@Injectable()
export class InvoicesService {
  private invoice: Invoice[] = [];
  constructor(
    @InjectModel('Invoice') private invoiceModel: Model<Invoice>,
  ) {}
  async createInvoice(createInvoiceDto:CreateInvoiceDto):Promise<Invoice> {
    const newInvoice = new this.invoiceModel(createInvoiceDto);
    newInvoice.orderItems.forEach(product =>{
      product.money = product.qty * product.price;
      newInvoice.totalMoney += product.money;
    })
    const result = await newInvoice.save();
    return result.save();
  }   


  async getInvoices() {
    const invoices = await this.invoiceModel.find().exec();
    invoices.forEach(invoice => {
      invoice.orderItems.forEach(order => {
        order.money = order.qty * order.price;
        invoice.totalMoney += order.money;
      });
    });
    return invoices
  }

  async getSingleInvoice(invoiceId:string){
    const invoice = await this.findInvoice(invoiceId)
    return invoice.orderItems[0]
  }

  async removeInvoice(InvoiceId: string) {
    const result = await this.invoiceModel.deleteMany({ _id: InvoiceId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find Invoice.');
    }
    console.log(result);
  }
  async deleteUserInvoice(userID: string) {
    const result = await this.invoiceModel.deleteOne({ userID: userID }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find Invoice.');
    }
    console.log(result);
  }
  async removeItem(invoiceId?: string,number?:number){
    const invoice = await this.findInvoice(invoiceId)
    invoice.orderItems[number-1] = {}
    return invoice.save()
  }
  // async getAmount(documentsToSkip = 0, limitOfDocuments?: number) {
  //   const findQuery = this.invoiceModel
  //     .find()
  //     .skip(documentsToSkip)
  //     .populate('createdAt');

  //   if (limitOfDocuments) {
  //     findQuery.limit(limitOfDocuments);
  //   }
  //   const results = await findQuery;

  //   return { results };
  // }

  private async findInvoice(id: string): Promise<Invoice> {
    let invoice;
    try {
      invoice = await this.invoiceModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find Invoice.');
    }
    if (!Invoice) {
      throw new NotFoundException('Could not find Invoice.');
    }
    return invoice;
  }
 }
