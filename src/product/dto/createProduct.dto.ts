import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
    @IsNotEmpty()
    readonly name:String; 
    readonly desc:  String;
    readonly image:  {mainImg:String, moreImg: Array<string>};
    readonly brand:{name: String, img: String};
    readonly category:Array<string>;
    readonly website: String;
    readonly effectiveDate:Date;
    readonly expirationDate: Date;
    readonly price:Number;
    readonly quantity:Number;
    readonly isSpecial:Boolean;

}