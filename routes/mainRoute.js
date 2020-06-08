const express = require("express");

const mainController = require("../controllers/mainController");

const router = express.Router();

router.get("/getAllCourses", mainController.getAllCourses);
router.get("/getAllTeachers", mainController.getAllTeachers);

module.exports = router;