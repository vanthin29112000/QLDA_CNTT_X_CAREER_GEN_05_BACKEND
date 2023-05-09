import { ICartItem } from './cart-item.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, HttpException } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateCartItemDto } from './dto/createCartItem.dto';
import { User } from 'src/auth/auth.model';
import { IProduct } from 'src/product/product.interface';

@Injectable()
export class CartItemService {
  constructor(
    @InjectModel('cartItem') private cartItemModel: Model<ICartItem>,
    @InjectModel('product') private productModel: Model<IProduct>
  ) {}

  async get(user: User) {
    const cart = await this.cartItemModel.findOne({ userId: user });
    return await this.formatData(cart, cart.userId);
  }

  async create(id: string, quantity: number, user: User) {
    const cart = await this.cartItemModel.findOne({ userId: user._id });

    if (cart) {
      const index = cart.products.findIndex((ele) => {
        return ele.productId === id;
      });
      if (index !== -1) {
        const productItem = await this.productModel.findById(id);
        const count = productItem.countInStock - productItem.countSold;
        if (count >= cart.products[index].quantity + quantity) {
          cart.products[index].quantity += quantity;
        } else {
          throw new HttpException('Vượt quá số lượng cho phép', 400);
        }
      } else {
        cart.products.push({
          productId: id,
          quantity: quantity
        });
      }
      await cart.save();
      return await this.formatData(cart, cart.userId);
    } else {
      const cartTemp = new this.cartItemModel({
        userId: user._id,
        products: [
          {
            productId: id,
            quantity: quantity
          }
        ]
      });

      await cartTemp.save();
      return await this.formatData(cartTemp, user._id);
    }
  }

  async update(id: string, quantity: number, user: User) {
    const cart = await this.cartItemModel.findOne({ userId: user._id });
    let cartItem;
    if (cart) {
      const index = cart.products.findIndex((ele) => {
        return ele.productId === id;
      });
      if (index !== -1) {
        const productItem = await this.productModel.findById(id);
        const count = productItem.countInStock - productItem.countSold;
        if (count >= quantity) {
          cart.products[index].quantity = quantity;
        } else {
          throw new HttpException('Vượt quá số lượng cho phép', 400);
        }
      } else {
        cart.products.push({
          productId: id,
          quantity: quantity
        });
      }
      cartItem = await cart.save();
    } else {
      const cartTemp = new this.cartItemModel({
        userId: user._id,
        products: [
          {
            productId: id,
            quantity: quantity
          }
        ]
      });

      cartItem = await cartTemp.save();
    }

    return await this.formatData(cartItem, user._id);
  }

  async delete(id: string, user: User) {
    const cart = await this.cartItemModel.findOne({ userId: user._id });

    let index = cart.products.findIndex((ele) => ele.productId === id);
    cart.products.splice(index, 1);
    await cart.save();

    return await this.formatData(cart, cart.userId);
  }

  async formatData(cart, userId) {
    let shoppingCart = [];
    for (const product of cart.products) {
      const tempProduct = await this.productModel.findOne({
        _id: product.productId
      });
      shoppingCart.push({
        infoProduct: tempProduct,
        quantity: product.quantity
      });
    }

    return {
      userID: userId,
      products: shoppingCart
    };
  }
}
