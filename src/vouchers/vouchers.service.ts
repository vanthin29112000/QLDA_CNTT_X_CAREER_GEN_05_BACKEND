/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { filter } from 'rxjs';
import { Voucher } from './voucher.model';
@Injectable()
export class VouchersService {
  private vouchers: Voucher[] = [];
  constructor(
    @InjectModel('Voucher') private readonly voucherModel: Model<Voucher>
  ) {}
  async insertVoucher(
    name: string,
    hotline: string,
    website: string,
    description: string,
    content: string,
    effectiveDate: string,
    expirationDate: string,
    price: number
  ) {
    const newVoucher = new this.voucherModel({
      name,
      hotline,
      website,
      description,
      content,
      effectiveDate,
      expirationDate,
      price
    });
    const result = await newVoucher.save();
    console.log(result);
    return result.save();
  }

  async getVouchers() {
    const Vouchers = await this.voucherModel.find().exec();
    return Vouchers.map((vou) => ({
      createdAt: vou.createdAt,
      id: vou.id,
      name: vou.name,
      updatedAt: vou.updatedAt,
      hotline: vou.hotline,
      website: vou.website,
      description: vou.description,
      content: vou.content,
      effectiveDate: vou.effectiveDate,
      expirationDate: vou.expirationDate,
      price: vou.price
    }));
  }

  async getSingleVoucher(voucherId: string) {
    const voucher = await this.findVoucher(voucherId);
    return {
      id: voucher.id,
      name: voucher.name,
      createdAt: voucher.createdAt,
      updatedAt: voucher.updatedAt,
      hotline: voucher.hotline,
      website: voucher.website,
      description: voucher.description,
      content: voucher.content,
      effectiveDate: voucher.effectiveDate,
      expirationDate: voucher.expirationDate,
      price: voucher.price
    };
  }
  async getVoucherByName(voucherName: string) {
    const Vouchers = await this.voucherModel.find({ name: voucherName }).exec();
    return Vouchers.map((vou) => ({
      createdAt: vou.createdAt,
      id: vou.id,
      name: vou.name,
      updatedAt: vou.updatedAt,
      hotline: vou.hotline,
      website: vou.website,
      description: vou.description,
      content: vou.content,
      effectiveDate: vou.effectiveDate,
      expirationDate: vou.expirationDate,
      price: vou.price
    }));
  }

  async updateVoucher(
    id: string,
    upAt: string,
    hotline: string,
    website: string,
    description: string,
    content: string,
    effectiveDate: string,
    expirationDate: string,
    price: number
  ) {
    const updatedVoucher = await this.findVoucher(id);
    if (upAt) {
      updatedVoucher.updatedAt = Date().toString();
    }
    if (description) {
      updatedVoucher.description = description;
    }
    if (price) {
      updatedVoucher.price = price;
    }
    if (website) {
      updatedVoucher.website = website;
    }
    if (hotline) {
      updatedVoucher.hotline = hotline;
    }
    if (content) {
      updatedVoucher.website = content;
    }
    if (effectiveDate) {
      updatedVoucher.effectiveDate = effectiveDate;
    }
    if (expirationDate) {
      updatedVoucher.expirationDate = expirationDate;
    }
    updatedVoucher.save();
  }

  async deleteVoucher(vouId: string) {
    const result = await this.voucherModel.deleteMany({ _id: vouId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find Voucher.');
    }
    console.log(result);
  }
  async getAmount(documentsToSkip = 0, limitOfDocuments?: number) {
    const findQuery = this.voucherModel
      .find()
      .skip(documentsToSkip)
      .populate('createdAt');

    if (limitOfDocuments) {
      findQuery.limit(limitOfDocuments);
    }
    const results = await findQuery;

    return { results };
  }

  private async findVoucher(id: string): Promise<Voucher> {
    let voucher;
    try {
      voucher = await this.voucherModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find Voucher.');
    }
    if (!voucher) {
      throw new NotFoundException('Could not find Voucher.');
    }
    return voucher;
  }
}
