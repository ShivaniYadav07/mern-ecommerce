const Product = require("../models/productModel");
const ErrorHndler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncErrors")

//create product
exports.createProduct = catchAsyncError( async (req, res, next)=>{

    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      product,
    });
});



//Get all products

exports.getAllProducts = catchAsyncError(async(req,res)=> {

    const products = await Product.find();
    res.status(200).json({
        success:true,
        products
    })
})

//getSingleProductDetails


exports.getProductDetails = catchAsyncError( async(req, res, next) => {
const product = await Product.findById(req.params.id);

if(!product){
    return next(new ErrorHndler("Product not dound", 404))
}

res.status(200).json({
    success:true,
    product
})
})
//update Product ===Admin

exports.updateProduct = catchAsyncError( async (req, res, next) =>{
    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHndler("Product not dound", 404))
    }

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    res.status(200).json({
        success:true,
        product
    })
})


//Delete Product

exports.deleteProduct = catchAsyncError( async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if(!product){
            return next(new ErrorHndler("Product not dound", 404))
        }

        await product.deleteOne(); // Use deleteOne() instead of remove()

        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});

