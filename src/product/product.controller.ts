import { CreateProductDto } from './dto/createProduct.dto';
import {
  Controller,
  Post,
  Body,
  Get,
  UsePipes,
  Param,
  Query,
  DefaultValuePipe,
  ParseIntPipe
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ValidationPipe } from '../shared/pipes/validator.pipe';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProductPagination(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number
  ) {
    return await this.productService.findManyWithPagination({ page, limit });
  }

  @Get('slider')
  async getProductSlider() {
    return await this.productService.findProductSlider();
  }
  @Get('special')
  async getProductSpecial() {
    return await this.productService.findProductSpecial();
  }
  @Get('special-offer')
  async getProductSpecialOffer() {
    return await this.productService.findProductSpecialOffer();
  }
  @Get(':id')
  async findProduct(@Param('id') id: string) {
    return await this.productService.findOne({ _id: id });
  }

  @UsePipes(new ValidationPipe())
  @Post()
  createProduct(@Body() data: CreateProductDto): any {
    return this.productService.create(data);
  }
}
