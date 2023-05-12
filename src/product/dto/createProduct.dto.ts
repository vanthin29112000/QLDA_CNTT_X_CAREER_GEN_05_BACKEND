import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  readonly name: string;
  readonly desc: string;
  readonly images: Array<string>;
  readonly brand: { name: string; img: string };
  readonly category: Array<string>;
  readonly website: string;
  readonly effectiveDate: Date;
  readonly expirationDate: Date;
  readonly price: number;
  readonly countInStock: number;
  readonly isSpecial: boolean;
  readonly userManual: string;
  readonly rules: string;
  readonly code: Array<string>;
}
