import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  readonly name: string;
  readonly desc: string;
  readonly image: { mainImg: string; moreImg: Array<string> };
  readonly brand: { name: string; img: string };
  readonly category: Array<string>;
  readonly website: string;
  readonly effectiveDate: Date;
  readonly expirationDate: Date;
  readonly price: number;
  readonly quantity: number;
  readonly isSpecial: boolean;
}
