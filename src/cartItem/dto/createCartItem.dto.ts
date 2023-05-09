export class CreateCartItemDto {
  readonly userId: string;
  readonly products: [{ productId: string; quantity: number }];

  readonly isCheckOut: 0 | 1;
}
