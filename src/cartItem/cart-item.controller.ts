import { UpdateCartItemDto } from './dto/updateCartItem.dto';
import { ICartItem } from './cart-item.interface';
import { CreateCartItemDto } from './dto/createCartItem.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Query,
  Delete,
  ParseIntPipe
} from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { User } from 'src/auth/auth.decorator';

@Controller('cart-item')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @Get()
  async getListCartItem(@User() user) {
    return await this.cartItemService.get(user);
  }

  @Post()
  createCartItem(
    @Body('id') id: string,
    @Body('quantity', ParseIntPipe) quantity: number,
    @User() user
  ) {
    return this.cartItemService.create(id, quantity, user);
  }

  @Put()
  updateCartItem(
    @Body('id') id: string,
    @Body('quantity', ParseIntPipe) quantity: number,
    @User() user
  ) {
    return this.cartItemService.update(id, quantity, user);
  }

  @Delete()
  deleteCartItem(@Body('id') id: string, @User() user) {
    return this.cartItemService.delete(id, user);
  }
}
