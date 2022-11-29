import { ProductScheme } from './product.model';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';


@Module({
    imports: [MongooseModule.forFeature([{ name: 'product', schema: ProductScheme }])],
    controllers:[ ProductController],
    providers: [ProductService]
})

export class ProductModule{}