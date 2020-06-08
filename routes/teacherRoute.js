const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController");


router.use(teacherController.verifyTeacher);
router.post("/createCourse", teacherController.createCourse);
router.post("/sendGrade", teacherController.sendGrade);
router.get("/getCourses", teacherController.getCourses);


module.exports = router;