import { IsNotEmpty } from 'class-validator';

export class CreateCartItemDto {
  @IsNotEmpty()
  readonly userId: string;
  readonly productId: string;
  readonly isCheckOut: 0 | 1;
  readonly quantity: number;
}
