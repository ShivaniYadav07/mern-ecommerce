const express = require("express");
const app = express();

const errorMiddleware = require("./middleware/error")
app.use(express.json())

//Route import

const products = require('./routes/productRoute');

app.use('/api/v1',products)

//Middleware for Error
app.use(errorMiddleware);

module.exports = app;