const ErrorHndler = require("../utils/errorhandler");
const User = require("../models/userModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail")
const crypto = require("crypto");
const cloudinary = require("cloudinary");


//Register a user
exports.registerUser = catchAsyncErrors( async(req, res, next)=>{

  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width:150,
    crop: "scale",
  })
    const {name, email, password} = req.body; 

    const user = await User.create({
        name,email,password,
        avatar:{
            public_id:myCloud.public_id,
            url:myCloud.secure_url,
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


//reset password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    // creating token hash
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");
  
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
  
    if (!user) {
      return next(
        new ErrorHndler(
          "Reset Password Token is invalid or has been expired",
          400
        )
      );
    }
  
    if (req.body.password !== req.body.confirmPassword) {
      return next(new ErrorHndler("Password does not match", 400));
    }
  
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
  
    await user.save();
  
    sendToken(user, 200, res);
  });
  

  //Get User Detail

  exports.getUserDetails = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.user.id);

    sendToken(user, 200, res);

  });
  
  //Update User Password
  
  exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");
  
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  
    if (!isPasswordMatched) {
      return next(new ErrorHndler("Old password is incorrect", 400));
    }
  
    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(new ErrorHndler("password does not match", 400));
    }
  
    user.password = req.body.newPassword;
  
    await user.save();
  
    sendToken(user, 200, res);
  });


// update User Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);
    const imageId = user.avatar.public_id;

    
   await cloudinary.v2.uploader.destroy(imageId);

   const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width:150,
    crop: "scale",
  })

    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  await user.save();
  res.status(200).json({
    success: true,
  });
});



  // Get all users(admin)

  exports.getAllUser = catchAsyncErrors(async(req, res, next) => {
    const users = await User.find();

    res.status(200).json({
    success:true,
    users,
})
  });

//Get single user(admin)
  exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);
  
    if (!user) {
      return next(new ErrorHndler(`User does not exist with Id: ${req.params.id}`));
    }
  
    res.status(200).json({
      success: true,
      user,
    });
  });

  // update User Role -- Admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  let user = User.findById(req.params.id);

  if(!user) {
    return next (
      new ErrorHndler(`Iser does not exist with id: ${req.params.id}`, 400)
    )
  }

  await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

//Delete User --Admin

  exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
   
const user = await User.findById(req.params.id);

if(!user){
    return next(new ErrorHndler(`User does not exist with id: ${req.params.id}`, 400));
}

const imageId = user.avatar.public_id;

await cloudinary.v2.uploader.destroy(imageId);
await user.remove;

    res.status(200).json({
        success:true,
        message:"User deleted successfully"
    })
  });

  //Create New Review or update the review

  exports.createProductReview = catchAsyncErrors(async (req, res, next) => {

    const {rating, comment, productId} = req.body;
    const review = {
        user:req.user._id,
        name:req.user.name,
        rating:Number(rating),
        comment
    }

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(rev => rev.user.toString()===req.user._id.toString())

    if(isReviewed){
        product.reviews.forEach(rev =>{
            if(rev.user.toString() === req.user._id.toString())
            rev.rating=rating,
            rev.comment=comment
        })
    }
    else{
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
    }

    let avg = 0
    product.ratings = product.reviews.forEach(rev =>{
        avg+=rev.rating
    }) /product.reviews.length

    await product.save({validateBeforeSave: false});

    res.status(200).json({
        success:true,
    })
  });
