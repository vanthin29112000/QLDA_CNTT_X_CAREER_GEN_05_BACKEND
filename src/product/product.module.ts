import { ProductScheme } from './product.model';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { storageVoucher } from 'src/storageVoucher/storageVoucher.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'product', schema: ProductScheme }]),
    MongooseModule.forFeature([
      { name: 'storageVoucher', schema: storageVoucher }
    ])
  ],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
