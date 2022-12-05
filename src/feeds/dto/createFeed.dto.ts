import { IsNotEmpty } from 'class-validator';

export class CreateFeedDto {
    @IsNotEmpty()
    readonly title:String; 
    readonly desc:  String;
    readonly image:  String;
 

}