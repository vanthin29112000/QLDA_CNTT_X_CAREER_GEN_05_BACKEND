import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VouchersModule } from './vouchers/vouchers.module';
import { MongooseModule } from "@nestjs/mongoose";
import { CartController } from './cart/cart.controller';
import { CartModule } from './cart/cart.module';
import { UserModule } from './user/user.module';
import { InvoiceModule } from './invoice/invoice.module';
@Module({
  imports: [VouchersModule,MongooseModule.forRoot('mongodb+srv://hung:SaizRtCW6j3HgiKx@cluster0.duga8j2.mongodb.net/nestjs-demo?retryWrites=true&w=majority'), CartModule, UserModule, InvoiceModule],
  controllers: [AppController, CartController],
  providers: [AppService],
})
export class AppModule {}
