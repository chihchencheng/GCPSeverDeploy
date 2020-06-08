const express = require("express");

const router = express.Router();

const authRoute = require("../controllers/authController");


router.post("/register", authRoute.register);
router.post("/login", authRoute.login);
router.post("/verify", authRoute.verify);

module.exports = router;