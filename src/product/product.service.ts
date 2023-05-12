import { CreateProductDto } from './dto/createProduct.dto';
import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductScheme } from './product.model';
import { InjectModel } from '@nestjs/mongoose';
import { IProduct, IProductRO, Pagination } from './product.interface';
import { IStorageVoucher } from 'src/storageVoucher/storageVoucher.interface';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('product') private productModel: Model<IProduct>,
    @InjectModel('storageVoucher')
    private storageVoucher: Model<IStorageVoucher>
  ) {}

  async search(query: any): Promise<IProduct[]> {
    const productSearch = await this.productModel.find();
    return productSearch;
  }
  async findProductSpecial(): Promise<IProduct[]> {
    return await this.productModel.find({ isSpecial: true }).limit(6);
  }
  async findProductSlider(): Promise<IProduct[]> {
    return await this.productModel.find({ isShowSlider: true }).limit(5);
  }

  async findProductSpecialOffer(): Promise<IProduct[]> {
    return await this.productModel.find({ price: 0 }).limit(5);
  }
  async findOne(field: any): Promise<IProduct> {
    const temp = await this.productModel.findOne({ ...field });
    return temp;
  }

  async findProductForAdmin(id: string) {
    const temp = await this.productModel.findById(id);
    const storageTemp = await this.storageVoucher.findOne({ productID: id });

    return {
      info: temp,
      code: storageTemp.code
    };
  }
  async updateSpecialVoucher(id: string) {
    const vouchers = await this.productModel.find({
      isSpecial: true
    });
    const item = await this.productModel.findById(id);

    if (vouchers.length === 6 && !item.isSpecial) {
      throw new NotFoundException('Vượt quá số lượng cho phép ');
    }

    item.isSpecial = !item.isSpecial;
    await item.save();

    return await this.productModel.find();
  }

  async updateSliderVoucher(id: string) {
    const vouchers = await this.productModel.find({
      isShowSlider: true
    });
    const item = await this.productModel.findById(id);

    if (vouchers.length === 6 && !item.isSpecial) {
      throw new NotFoundException('Vượt quá số lượng cho phép ');
    }

    item.isShowSlider = !item.isShowSlider;
    await item.save();

    return await this.productModel.find();
  }

  async findManyWithPagination(pagination: Pagination): Promise<IProductRO> {
    let { page, limit } = pagination;
    page <= 0 ? (page = 1) : page;
    const ProductSkip: number = (page - 1) * limit;
    const totalProduct = await this.productModel.find();
    const data = await this.productModel.find();

    return {
      status: 200,
      data: data.filter((ele) => ele.deleteInfo.isDelete === false)
    };
  }

  async create(createProductDto: CreateProductDto) {
    const {
      desc,
      name,
      images,
      brand,
      category,
      website,
      effectiveDate,
      expirationDate,
      price,
      countInStock,
      isSpecial,
      userManual,
      rules,
      code
    } = createProductDto;
    const createdProduct = new this.productModel({
      desc,
      name,
      images,
      brand,
      category,
      website,
      effectiveDate,
      expirationDate,
      price,
      countInStock,
      isSpecial,
      userManual,
      rules
    });
    const productItem = await createdProduct.save();

    const storage = new this.storageVoucher({
      productID: productItem._id,
      code
    });

    await storage.save();
    return await this.productModel.find();
  }

  async updateVoucher(
    id: string,
    website: string,
    desc: string,
    // content: string,
    effectiveDate: Date,
    expirationDate: Date,
    price: number,
    images: Array<string>,
    countInStock: number,
    name: string,
    brand: { name: string; img: string },
    category: Array<string>,
    code: Array<string>,
    rules: string,
    userManual: string
  ) {
    const updatedVoucher = await this.productModel.findById(id);

    updatedVoucher.desc = desc || updatedVoucher.desc;

    updatedVoucher.price = price;

    updatedVoucher.website = website || updatedVoucher.website;

    updatedVoucher.rules = rules || updatedVoucher.rules;

    updatedVoucher.effectiveDate =
      effectiveDate || updatedVoucher.effectiveDate;

    updatedVoucher.expirationDate =
      expirationDate || updatedVoucher.expirationDate;

    updatedVoucher.images = images || updatedVoucher.images;
    updatedVoucher.countInStock = countInStock || updatedVoucher.countInStock;
    updatedVoucher.name = name || updatedVoucher.name;
    updatedVoucher.brand = brand || updatedVoucher.brand;
    updatedVoucher.category = category || updatedVoucher.category;
    updatedVoucher.userManual = userManual || updatedVoucher.userManual;

    const updateStorage = await this.storageVoucher.findOne({ productID: id });
    updateStorage.code = code || updateStorage.code;

    const storageItem = await updateStorage.save();
    const item = await updatedVoucher.save();

    const products = await this.productModel.find();

    return {
      products,
      productEdit: {
        info: item,
        code: storageItem.code
      }
    };
  }

  async deleteProduct(id: string) {
    const product = await this.productModel.findById(id);
    product.deleteInfo.isDelete = !product.deleteInfo.isDelete;
    product.isShowSlider = false;
    product.isSpecial = false;

    await product.save();

    const products = await this.productModel.find();
    const storage = await this.storageVoucher.findOne({ productID: id });
    return {
      products,
      productEdit: {
        info: product,
        code: storage.code
      }
    };
  }
}
