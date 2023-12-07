const { registerUser } = require("../controller/userController");

const express = require("express");
const router = express.Router();

router.route("/register").post(registerUser);

module.exports = router;