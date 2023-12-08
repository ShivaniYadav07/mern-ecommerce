const ErrorHndler = require("../utils/errorhandler");
const User = require("../models/userModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail")

exports.registerUser = catchAsyncErrors( async(req, res, next)=>{
    const {name, email, password} = req.body; 

    const user = await User.create({
        name,email,password,
        avatar:{
            public_id:"this is a sample id",
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
});

// Logout User

exports.logout = catchAsyncErrors(async(req, res, next) => {
    res.cookie("token", null,{
        expires:new Date(Date.now()),
        httpOnly: true,
    })
    res.status(200).json({
        success:true,
        message: "Logged Out",
    })
})

//forgot password

exports.forgotPassword = catchAsyncErrors(async(req, res, next) => {
    const user = await User.findOne({email:req.body.email});

    if(!user){
        return next (new ErrorHndler("User not found", 404));
    }

    //get ResetPassword Token

    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave: false});

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf ypu have not requested email then, please ignore it`;

    try{

        await sendEmail({

            email: user.email,
            subject: `Ecommerce Password Recovery`,
            message,
        });

        res.status(200).json({
            success:true,
            message: `Email sent to ${user.email} successfully`,
        })
    }
    catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false});

        return next(new ErrorHndler(error.message, 500))
    }
})