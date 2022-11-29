import * as mongoose from 'mongoose';


export interface IProduct extends mongoose.Document{
    name:String, 
    desc:  String,
    image:  {mainImg:String, moreImg: Array<string>},
    brand:{name: String, img: String},
    category:Array<string>,
    website: String,
    effectiveDate:Date,
    expirationDate: Date,
    price:Number,
    quantity:Number,
    isSpecial: Boolean,

    createdAt: Date,
    updatedAt: Date

}

export interface IProductRO {
    status: number,
    data: IProduct[],
    paginationInfo:{
        totalProduct: number,
        currentPage: number,
        pageSize:number
    }
}
export interface Pagination {
    page: number,
    limit: number
}