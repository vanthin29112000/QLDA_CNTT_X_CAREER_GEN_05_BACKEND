/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  Query,
  UseInterceptors
} from '@nestjs/common';
import MongooseClassSerializerInterceptor from '../utils/mongooseClassSerializer.interceptor';
import { Invoice, Invoice as InvoiceModel } from './invoices.model';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/createInvoice.dto';
import { ItemParams } from './dto/deleteItem.dto';
import { User } from 'src/auth/auth.decorator';

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoicesService: InvoicesService) {}
  @Post()
  async createInvoice(@Body() createInvoiceDto: CreateInvoiceDto) {
    const newInvoice = await this.invoicesService.createInvoice(
      createInvoiceDto
    );
    return newInvoice;
  }
  @Get()
  async getInvoicesForCustomer(@User() user) {
    const invoices = await this.invoicesService.getInvoices(user);
    return invoices;
  }

  @Put()
  updateUsedVoucher(
    @User() user,
    @Body('invoiceId') invoiceId: string,
    @Body('idP') idP: string,
    @Body('code') code: string
  ) {
    return this.invoicesService.updateUsedVoucher(user, invoiceId, idP, code);
  }
  @Delete(':id')
  async removeInvoice(@Param('id') invoiceID: string) {
    await this.invoicesService.removeInvoice(invoiceID);
    return null;
  }
  @Delete()
  async deleteUserInvoice(@Query('userID') userID: string) {
    await this.invoicesService.deleteUserInvoice(userID);
    return null;
  }
}
@Controller('item')
export class ItemController {
  constructor(private readonly invoicesService: InvoicesService) {}
  @Delete(':id')
  async deleteItem(@Param('id') id: string, @Query() index: number) {
    return this.invoicesService.removeItem(id, index);
  }
}
