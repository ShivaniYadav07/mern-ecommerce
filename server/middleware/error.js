const ErrorHandle = require("../utils/errorhandler");

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server Error";

    // Mongodb Id Error
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandle(message, 400);
    }

    // Mongoose duplicate key error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandle(message, 400);
    }

    //Wrong jwt error
    if (err.name === "JsonWebTokenError") {
        const message = `Json Web Token is invalid, try again`;
        err = new ErrorHandle(message, 400);
    }

    //JWT Expire Error

    if (err.name === "TokenExpiredError") {
        const message = `Json Web token is Expired, try again `;
        err = new ErrorHandle(message, 400);
    }


    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};
