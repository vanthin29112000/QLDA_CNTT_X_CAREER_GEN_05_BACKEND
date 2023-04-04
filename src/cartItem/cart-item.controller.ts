import { UpdateCartItemDto } from './dto/updateCartItem.dto';
import { ICartItem } from './cart-item.interface';
import { CreateCartItemDto } from './dto/createCartItem.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Query,
  Delete,
  ParseIntPipe
} from '@nestjs/common';
import { CartItemService } from './cart-item.service';

@Controller('cart-item')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @Get()
  async getListCartItem() {
    return await this.cartItemService.get();
  }

  @Post()
  createCartItem(
    @Body() createCartItemDto: CreateCartItemDto
  ): Promise<ICartItem> {
    return this.cartItemService.create(createCartItemDto);
  }

  @Patch()
  updateCartItem(
    @Query('id') id: string,
    @Body('quantity', ParseIntPipe) quantity: number
  ): Promise<ICartItem> {
    return this.cartItemService.update(id, quantity);
  }

  @Delete()
  deleteCartItem(@Query('id') id: string) {
    return this.cartItemService.delete(id);
  }
}
