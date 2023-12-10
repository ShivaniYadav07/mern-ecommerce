const { registerUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword } = require("../controller/userController");
const {loginUser} = require("../controller/userController")
const express = require("express");
const {isAuthenticatedUser, authorizeRoles} = require("../middleware/auth")
const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logout);

router.route("/me").get(isAuthenticatedUser, getUserDetails);

router.route("/password/update").get(isAuthenticatedUser, updatePassword)

module.exports = router;