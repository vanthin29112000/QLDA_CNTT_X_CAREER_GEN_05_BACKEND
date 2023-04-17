import { CreateProductDto } from './dto/createProduct.dto';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { ProductScheme } from './product.model';
import { InjectModel } from '@nestjs/mongoose';
import { IProduct, IProductRO, Pagination } from './product.interface';

@Injectable()
export class ProductService {
  constructor(@InjectModel('product') private productModel: Model<IProduct>) {}

  async search(query: any): Promise<IProduct[]> {
    const productSearch = await this.productModel.find();
    return productSearch;
  }
  async findProductSpecial(): Promise<IProduct[]> {
    return await this.productModel.find({ isSpecial: true }).limit(5);
  }
  async findProductSlider(): Promise<IProduct[]> {
    return await this.productModel.find({ isShowSlider: true }).limit(5);
  }
  async findOne(field: any): Promise<IProduct> {
    const temp = await this.productModel.findOne({ ...field });
    return {
       status: 200,
      data: temp,
    }
  }

  async findManyWithPagination(pagination: Pagination): Promise<IProductRO> {
    let { page, limit } = pagination;
    page <= 0 ? (page = 1) : page;
    const ProductSkip: number = (page - 1) * limit;
    const totalProduct = await this.productModel.find();
    const data = await this.productModel.find();
    // const paginationInfo = {
    //   totalProduct: totalProduct.length,
    //   pageSize: limit,
    //   currentPage: page
    // };
    return {
      status: 200,
      data: data
      // paginationInfo
    };
  }

  async create(createProductDto: CreateProductDto): Promise<IProduct> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }
}
