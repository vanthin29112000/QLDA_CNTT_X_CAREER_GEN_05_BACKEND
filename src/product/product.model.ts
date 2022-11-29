import * as mongoose from 'mongoose';
const ImageScheme = new mongoose.Schema({
    mainImg: {
        type:String,
        // require:true
    },
    moreImg:[]
})
export const ProductScheme = new mongoose.Schema({
    name: { type: String, required: true,},
    desc: { 
            type: String, 
            required: false, 
        },
    image:  [ImageScheme],
   
    category:Array,
    website: String,
    effectiveDate: {
        type: Date,
        // require: true,
    },
    expirationDate:{
        type: Date,
        // require: true,
    },
    price: {
        type:Number,
        required: true,
    },
    quantity:{
        type:Number,
        require:true,
    },
    isSpecial: { type: Boolean, default: false}
},
    {timestamps: true}
);

