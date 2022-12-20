import { CartItemService } from './cart-item.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { CartItemSchema } from './cart-item.model';
import { CartItemController } from './cart-item.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'cartItem', schema: CartItemSchema }])
  ],
  controllers: [CartItemController],
  providers: [CartItemService]
})
export class CartItemModule {}
