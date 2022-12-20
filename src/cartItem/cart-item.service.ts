import { ICartItem } from './cart-item.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateCartItemDto } from './dto/createCartItem.dto';

@Injectable()
export class CartItemService {
  constructor(
    @InjectModel('cartItem') private cartItemModel: Model<ICartItem>
  ) {}

  async get(): Promise<ICartItem[]> {
    return await this.cartItemModel.find();
  }

  async create(createCartItemDto: CreateCartItemDto): Promise<ICartItem> {
    const createCartItem = new this.cartItemModel(createCartItemDto);
    return createCartItem.save();
  }

  async update(id: string, quantity: number): Promise<ICartItem> {
    const update = await this.cartItemModel.findByIdAndUpdate(id, { quantity });
    return update;
  }

  async delete(id: string) {
    const deleteItem = await this.cartItemModel.findByIdAndDelete(id);
    return deleteItem;
  }
}
