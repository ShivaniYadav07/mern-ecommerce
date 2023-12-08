const { registerUser, logout, forgotPassword } = require("../controller/userController");
const {loginUser} = require("../controller/userController")
const express = require("express");
const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);


router.route("/logout").get(logout);
router.route("/password/forgot").post(forgotPassword);


module.exports = router;