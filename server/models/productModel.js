const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please Enter product Name"]
    },
    description:{
        type:String,
        required:[true, "Please Enter product Description"]
    },
    price:{
        type:Number,
        required:[true, "Please Enter product Price"],
        maxLength:[8, "price cannot exceed 8 characters"]
    },
    rating:{
        type:Number,
        default:0
    },
    images:[
        {
            public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,
        }
    }
    ],
    category:{
        type:String,
        required: [true,"Please Enter Product Category"]
    },
    Stock:{
        type:Number,
        required:[true,"Please Enter product Stock"],
        maxLength:[4, "Stock cannot exceed 4 characters"],
        default:1
    },
    numOfReviews:[
        {
            name:{
                type:String,
                required:true,
            },
            Comment:{
                type:String,
                required:true

            }
        }
    ],
    createAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("Product",productSchema)