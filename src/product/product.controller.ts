import { CreateProductDto } from './dto/createProduct.dto';
import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  UsePipes,
  Param,
  Delete,
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

  @Get('admin/:id')
  async findProductForAdmin(@Param('id') id: string) {
    return await this.productService.findProductForAdmin(id);
  }

  @Put('/special/:id') async updateSpecialVoucher(
    @Param('id') voucherID: string
  ) {
    return await this.productService.updateSpecialVoucher(voucherID);
  }

  @Put('/slider/:id') async updateSliderVoucher(
    @Param('id') voucherID: string
  ) {
    return await this.productService.updateSliderVoucher(voucherID);
  }

  // @UsePipes(new ValidationPipe())
  @Post()
  createProduct(@Body() data: CreateProductDto) {
    return this.productService.create(data);
  }

  @Put(':id')
  updateVoucher(
    @Param('id') id: string,
    @Body('website') vouWebsite: string,
    @Body('desc') desc: string,
    @Body('effectiveDate') effectiveDate: Date,
    @Body('expirationDate') expirationDate: Date,
    @Body('price') price: number,
    @Body('name') name: string,
    @Body('website') website: string,

    @Body('images') images: Array<string>,
    @Body('countInStock') countInStock: number,
    @Body('brand') brand: { name: string; img: string },
    @Body('category') category: Array<string>,
    @Body('rules') rules: string,
    @Body('userManual') userManual: string,
    @Body('code') code: Array<string>
  ) {
    return this.productService.updateVoucher(
      id,
      website,
      desc,
      effectiveDate,
      expirationDate,
      price,
      images,
      countInStock,
      name,
      brand,
      category,
      code,
      rules,
      userManual
    );
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
}
