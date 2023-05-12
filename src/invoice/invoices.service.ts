/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Invoice } from './invoices.model';
import { CreateInvoiceDto } from './dto/createInvoice.dto';
import { IProduct } from 'src/product/product.interface';
import { async } from 'rxjs';
import { ICartItem } from 'src/cartItem/cart-item.interface';
import { IStorageVoucher } from 'src/storageVoucher/storageVoucher.interface';
import { User } from 'src/auth/auth.model';
@Injectable()
export class InvoicesService {
  private invoice: Invoice[] = [];
  constructor(
    @InjectModel('Invoice') private invoiceModel: Model<Invoice>,
    @InjectModel('product') private productModel: Model<IProduct>,
    @InjectModel('cartItem') private cartItemModel: Model<ICartItem>,
    @InjectModel('storageVoucher')
    private storageVoucher: Model<IStorageVoucher>,
    @InjectModel('user') private readonly authModel: Model<User>
  ) {}
  async createInvoice(createInvoiceDto: CreateInvoiceDto) {
    const newInvoice = new this.invoiceModel(createInvoiceDto);
    const user = await this.authModel.findById(createInvoiceDto.userID);

    for (const index in newInvoice.orderItems) {
      const invoiceItem = newInvoice.orderItems[index];
      newInvoice.totalMoney += invoiceItem.price * invoiceItem.qty;

      user.totalCost += newInvoice.totalMoney;
      user.qtyPurchased += invoiceItem.qty;

      const tempProduct = await this.productModel.findOne({
        _id: invoiceItem.idP
      });

      tempProduct.countSold += invoiceItem.qty;
      await tempProduct.save();

      const tempStorage = await this.storageVoucher.findOne({
        productID: invoiceItem.idP
      });

      const storageUsed = tempStorage.code.splice(0, invoiceItem.qty);

      tempStorage.used = [...tempStorage.used, ...storageUsed];

      const temp = storageUsed.map((ele) => {
        return { name: ele, isUsed: false };
      });
      invoiceItem.code = temp;

      await tempStorage.save();
    }

    await user.save();
    await newInvoice.save();

    const cart = await this.cartItemModel.findOne({
      userId: createInvoiceDto.userID
    });
    cart.products = [];
    await cart.save();

    return cart;
  }

  async getInvoices(user: User) {
    const invoices = await this.invoiceModel
      .find({ userID: user._id })
      .sort({ createdAt: -1 });

    return invoices;
  }

  async getAllInvoices() {
    const invoices = await this.invoiceModel.find().sort({ createdAt: -1 });
    return invoices;
  }

  async updateUsedVoucher(
    user: User,
    invoiceId: string,
    idP: string,
    code: string
  ) {
    console.log('hello', invoiceId, idP, code);
    const invoice = await this.invoiceModel.findById(invoiceId);
    const index = invoice.orderItems.findIndex(
      (ele) => ele.idP.toString() === idP
    );

    const indexCode = invoice.orderItems[index].code.findIndex(
      (ele) => ele.name === code
    );
    invoice.orderItems[index].code[indexCode].isUsed =
      !invoice.orderItems[index].code[indexCode].isUsed;

    console.log(
      'index',
      indexCode,
      index,
      !invoice.orderItems[index].code[indexCode].isUsed
    );

    await invoice.save();

    return await this.invoiceModel
      .find({ userID: user._id })
      .sort({ createdAt: -1 });
  }

  async removeInvoice(InvoiceId: string) {
    const result = await this.invoiceModel
      .deleteMany({ _id: InvoiceId })
      .exec();
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
  async removeItem(invoiceId?: string, number?: number) {
    const invoice = await this.findInvoice(invoiceId);
    // invoice.orderItems[number - 1] = {};
    return invoice.save();
  }

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
