const express = require("express");
const app = express();
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload")
const errorMiddleware = require("./middleware/error")
app.use(express.json())
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload());

//Route import
const products = require('./routes/productRoute');
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute")

app.use('/api/v1',products)
app.use("/api/v1", user);
app.use("/api/v1", order);
//Middleware for Error
app.use(errorMiddleware);

module.exports = app;