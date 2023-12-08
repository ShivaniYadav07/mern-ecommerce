const { registerUser } = require("../controller/userController");
const {loginUser} = require("../controller/userController")
const express = require("express");
const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

module.exports = router;