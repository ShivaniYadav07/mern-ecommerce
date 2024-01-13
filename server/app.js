const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const errorMiddleware = require("./middleware/error");
const path = require('path');
//config
if(process.env.NODE_ENV!=="PRODUCTION"){
    require("dotenv").config({ path: 'server/config/config.env' });
  }
app.use(express.json())
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload());

//Route import
const products = require('./routes/productRoute');
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute")
const payment = require("./routes/paymentRoute")

app.use('/api/v1',products)
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build/index.html"))
})
//Middleware for Error
app.use(errorMiddleware);

module.exports = app;