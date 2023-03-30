import { PartialType } from '@nestjs/mapped-types';
import { CreateCartItemDto } from './createCartItem.dto';

export class UpdateCartItemDto extends PartialType(CreateCartItemDto) {}
