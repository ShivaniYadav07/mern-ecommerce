const ErrorHndler = require("../utils/errorhandler");
const User = require("../models/userModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.registerUser = catchAsyncErrors( async(req, res, next)=>{
    const {name, email, password} = req.body; 

    const user = await User.create({
        name,email,password,
        avatar:{
            public_id:"thi is a sample id",
            url:"profileurl"
        }
    });

    const token = user.getJWTToken();
    res.status(201).json({
        suceess: true,
        token,
    })
})