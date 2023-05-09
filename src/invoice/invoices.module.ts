/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { InvoiceController, ItemController } from './invoices.controller';
import { InvoicesService } from './invoices.service';
import { MongooseModule } from '@nestjs/mongoose';
import { InvoiceSchema } from './invoices.model';
import { CartItemSchema } from 'src/cartItem/cart-item.model';
import { storageVoucher } from 'src/storageVoucher/storageVoucher.model';
import { AuthSchema } from 'src/auth/auth.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Invoice',
        schema: InvoiceSchema
      }
    ]),
    MongooseModule.forFeature([{ name: 'product', schema: CartItemSchema }]),
    MongooseModule.forFeature([{ name: 'cartItem', schema: CartItemSchema }]),
    MongooseModule.forFeature([
      { name: 'storageVoucher', schema: storageVoucher }
    ]),
    MongooseModule.forFeature([
      {
        name: 'user',
        schema: AuthSchema
      }
    ])
  ],
  controllers: [InvoiceController, ItemController],
  providers: [InvoicesService]
})
export class InvoiceModule {}
