const express = require("express");
const studentController = require("../controllers/studentController");

const router = express.Router();

router.use(studentController.verifyStudent);
router.post("/joinCourse", studentController.joinCourse);
router.get("/getCourses", studentController.getCourses);

module.exports = router;