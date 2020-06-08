const User = require("../models/user");
const Course = require("../models/course");

const verifyTeacher = async (req, res, next) => {
    console.log("verify teacher");
    let payload = req.payload;
    try {
        let user = await User
            .findOne({ account: payload.account })
            .select("-password")
            .exec();
        let userType = user.userType;
        if (userType !== 1) {
            console.log("userType: Student")
            res.json({ errorCode: 403, data: "Forbidden" });
            return;
        }
        req.user = user;
        next();
    } catch (err) {
        res.json({ errorCode: 500, data: err });
    }
};

const createCourse = async (req, res, next) => {
    console.log("create course");
    let name = req.body.name;
    let desc = req.body.desc;
    if (name === undefined) {
        res.json({ errorCode: 400, data: "Invalid Parameter" });
        return;
    }
    let course = new Course({
        name: name,
        desc: desc,
        teacher: req.user._id
    });
    try {
        await course.save();
        console.log("create success");
        res.json({ errorCode: -1, data: course });
    } catch (err) {
        res.json({ errorCode: 500, data: err });
    }
};

const sendGrade = async (req, res, next) => {
    console.log("send Grade");
    let courseId = req.body.courseId;
    let grade = req.body.grade;
    let studentId = req.body.studentId;
    if (grade === undefined || courseId === undefined || studentId === undefined) {
        res.json({ errorCode: 400, data: "Invalid Parameter" });
        return;
    }
    try {
        let course = await Course.findOne({ _id: courseId }).exec();
        if (!course) {
            res.json({ errorCode: 404, data: "Data Not Found" });
            return;
        }
        let student = course.students.find(data => String(data.student) === studentId);
        if (!student) {
            res.json({ errorCode: 404, data: "Data Not Found" });
            return;
        }
        student.grade = grade;
        await course.save();
        res.json({ errorCode: -1, data: course });
    } catch (err) {
        res.json({ errorCode: 500, data: err });
        return;
    }

};

const getCourses = async (req, res, next) => {
    console.log("get courses");
    let teacher = req.user._id;
    try {
        let courses = await Course
            .find({ "teacher": teacher })
            .select("-__v")
            .lean();
        if (!courses) {
            res.json({ errorCode: 404, data: "Not Found" });
            return;
        }
        res.json({ errorCode: -1, data: courses });
    } catch (err) {
        res.json({ errorCode: 500, data: err });
        return;
    }


}



module.exports = {
    verifyTeacher,
    createCourse,
    sendGrade,
    getCourses
}
