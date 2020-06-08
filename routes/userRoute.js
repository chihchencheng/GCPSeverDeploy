const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const router = express.Router();

router.get("/getUserInfo", userController.getUserInfo);
router.post("/editUserInfo", userController.editUserInfo);
router.post("/changePassword", userController.changePassword);

module.exports = router;