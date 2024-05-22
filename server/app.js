const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
const cors = require("cors");
const errorMiddleware = require("./middleware/error");

const app = express();

// Load environment variables if not in production
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: path.join(__dirname, "config/.env") });
}

// Middleware
app.use(
  cors({
    origin: ["https://mern-ecommerce-fc7df.web.app", "http://localhost:3000"],
    // credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb", parameterLimit: 50000 }));
app.use(fileUpload());

// Route imports
const products = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");

app.use("/api/v1", products);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

// Serve static files
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
});

// Middleware for errors
app.use(errorMiddleware);

module.exports = app;
