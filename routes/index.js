const express = require("express");

const mainRoute = require("./mainRoute");
const userRoute = require("./userRoute");
const authRoute = require("./authRoute");
const teacherRoute = require("./teacherRoute");
const studentRoute = require("./studentRoute");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController")

const router = express.Router();

router.use("/auth", authRoute);
router.use("/main", mainRoute);
router.use("/user", userRoute);// without verify temp
router.get("/getAllUser", userController.getAllUser)// without verify temp

router.use(authController.verify);// middleware


router.use("/student", studentRoute);
router.use("/teacher", teacherRoute);


module.exports = router;