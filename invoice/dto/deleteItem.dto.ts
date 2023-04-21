/* eslint-disable prettier/prettier */
import { IsNumber, Min, IsOptional, IsString } from 'class-validator';
import { Type } from "class-transformer";
 
export class ItemParams {
  @IsOptional()
  @Type(() => String)
  @IsString()
  @Min(0)
  id?: string;
 
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  index?: number;
}