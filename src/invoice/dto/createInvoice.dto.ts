/* eslint-disable prettier/prettier */
import { Type } from 'class-transformer';
import {
  IsString,
  IsObject,
  IsArray,
  ValidateNested,
  IsNotEmpty,
  IsNumber,
  isString,
  IsDate
} from 'class-validator';

class OrderItemDto {
  @IsNotEmpty()
  @IsArray()
  @Type(() => String)
  idP: string[];

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  qty: number;

  @IsNotEmpty()
  @IsString()
  img: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  // @IsNotEmpty()
  // @IsString()
  // code: string;
}

class infoAddressDto {
  @IsNotEmpty()
  @IsArray()
  name: string;
  id: string;
}

class AddressDto {
  @IsNotEmpty()
  @ValidateNested()
  @IsArray()
  city: infoAddressDto;

  @IsNotEmpty()
  @ValidateNested()
  @IsArray()
  district: infoAddressDto;

  @IsNotEmpty()
  @ValidateNested()
  @IsArray()
  ward: infoAddressDto;

  @IsNotEmpty()
  @IsString()
  mainAddress: string;
}

export class CreateInvoiceDto {
  @IsNotEmpty()
  @IsString()
  userID: string[];

  // @IsNotEmpty()
  // @IsString()
  // createdAt: Date;

  @IsNotEmpty()
  @ValidateNested()
  @IsArray()
  address: AddressDto;

  @IsNotEmpty()
  // @ValidateNested({ each: true })
  @IsArray()
  orderItems: OrderItemDto[];

  @IsNotEmpty()
  @IsString()
  statusOrder: string;

  @IsNotEmpty()
  @IsString()
  paymentType: string;

  @IsNotEmpty()
  @IsNumber()
  Total: number;

  @IsNotEmpty()
  @IsDate()
  effectiveDate: Date;

  @IsNotEmpty()
  @IsDate()
  expirationDate: Date;
}
