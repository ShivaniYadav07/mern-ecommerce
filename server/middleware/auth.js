const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  // const { token } = req.cookies;
  // if (!token) {
    //   return next(new ErrorHandler("Please Login to access this resource", 401));
    // }
    // const decodeData = jwt.verify(token, process.env.JWT_SECRET);
    let bearerHeader = req.headers["authorization"];
    if (!bearerHeader) {
      return next(
        new ErrorHandler("Please Login to access this resource", 401)
      );
    }
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1]
    const decodeData = jwt.verify(bearerToken, process.env.JWT_SECRET);

  req.user = await User.findById(decodeData.id);
  next();
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
