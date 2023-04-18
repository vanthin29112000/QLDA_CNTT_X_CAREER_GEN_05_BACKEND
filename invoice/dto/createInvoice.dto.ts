/* eslint-disable prettier/prettier */
import { Type } from 'class-transformer';
import { IsString, IsObject, IsArray, ValidateNested, IsNotEmpty, IsNumber } from 'class-validator';

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

  @IsNotEmpty()
  @IsNumber()
  Money: number ;

}
  

class AddressDto {
  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  district: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsString()
  ward: string;
}

export class CreateInvoiceDto {
  @IsNotEmpty()
  @IsString()
  userID: string[];

  @IsNotEmpty()
  @IsString()
  createdAt: string;

  @IsNotEmpty()
  @ValidateNested()
  @IsArray()
  address: AddressDto;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @IsArray()
  orderItems: OrderItemDto[];

  @IsNotEmpty()
  @IsString()
  statusOrder: string;

  @IsNotEmpty()
  @IsNumber()
  Total: number;

}
