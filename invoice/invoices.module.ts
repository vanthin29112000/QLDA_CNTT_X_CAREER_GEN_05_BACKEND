/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { InvoiceController ,ItemController} from './invoices.controller';
import { InvoicesService } from './invoices.service';
import { MongooseModule } from '@nestjs/mongoose';
import { InvoiceSchema } from './invoices.model';

@Module({
  imports: [MongooseModule.forFeature([
    {
        name:"Invoice",schema:InvoiceSchema,
    }
])],
  controllers: [InvoiceController,ItemController],
  providers: [InvoicesService]
})
export class InvoiceModule {}
