/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
    Query,
    UseInterceptors,
  } from '@nestjs/common';
  import MongooseClassSerializerInterceptor from '../utils/mongooseClassSerializer.interceptor';
  import { Invoice, Invoice as InvoiceModel } from './invoices.model';
  import { InvoicesService } from './invoices.service';
  import { CreateInvoiceDto } from './dto/createInvoice.dto';
  import { ItemParams } from './dto/deleteItem.dto';

  @Controller('invoice')
  export class InvoiceController {
    constructor(private readonly invoicesService: InvoicesService) {}
    @Post()
    async createInvoice(
      @Body() createInvoiceDto:CreateInvoiceDto): Promise<Invoice>{
      const newInvoice = await this.invoicesService.createInvoice(createInvoiceDto);
      return newInvoice
    }
    @Get()
    async getAllInvoices() {
      const invoices = await this.invoicesService.getInvoices();
      return invoices;
    }
  
    @Get(':id')
    getSingleInvoice(@Param('id') invoiceID: string) {
      return this.invoicesService.getSingleInvoice(invoiceID);}
    @Delete(':id')
    async removeInvoice(@Param('id') invoiceID: string) {
      await this.invoicesService.removeInvoice(invoiceID);
      return null;
    }
    @Delete()
    async deleteUserInvoice(@Query('userID') userID:string){
      await this.invoicesService.deleteUserInvoice(userID);
      return null;
    }
  }
  @Controller('item')
  export class ItemController {
    constructor(private readonly invoicesService: InvoicesService) {}
    @Delete(':id')
    async deleteItem(@Param('id')id:string,
    @Query()index:number){
      return this.invoicesService.removeItem(id,index)
    }
  }