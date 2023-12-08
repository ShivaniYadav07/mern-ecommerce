const ErrorHndler = require("../utils/errorhandler");
const User = require("../models/userModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken")

exports.registerUser = catchAsyncErrors( async(req, res, next)=>{
    const {name, email, password} = req.body; 

    const user = await User.create({
        name,email,password,
        avatar:{
            public_id:"thi is a sample id",
            url:"profileurl"
        }
    });

    sendToken(user, 201, res);
    
});

//Login User

exports.loginUser = catchAsyncErrors (async (req, res, next) =>{
    const  {email, password} = req.body;

    //checking if user has given email and pass both 

    if(!email|| !password){
        return next (new ErrorHndler("Please enter Email and password", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if(!user){
        return next(new ErrorHndler("Invalid email or password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHndler("Invalid email or password", 401));
    }

   sendToken(user, 200, res);
})