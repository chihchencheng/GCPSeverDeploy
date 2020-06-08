const User = require("../models/user");
const Course = require("../models/course");

const verifyStudent = async (req, res, next) => {
    console.log("verify student start")
    let payload = req.payload;
    try {
        let user = await User
            .findOne({ account: payload.account })
            .select("-password")
            .exec();
        if (!user) {
            console.log("can't find user");
            res.json({ errorCode: 404, data: "Not Found" })
            return;
        }
        console.log(user.userType);
        if (user.userType !== 0) {
            res.json({ errorCode: 403, data: "Forbidden" });
            return;
        }
        console.log("verify student success");
        req.user = user;
        next();
    } catch (err) {
        res.json({ errorCode: 500, data: err });
    }

};

const joinCourse = async (req, res, next) => {
    console.log("student join Course");
    let courseId = req.body.courseId;

    if (courseId === undefined) {
        res.json({ errorCode: 404, data: "Invalid Parameter" });
        return;
    }
    try {
        let course = await (await Course.findOne({ _id: courseId })).execPopulate();
        if (!course) {
            res.json({ errorCode: 404, data: "Data Not Found" });
            return;
        }
        if (course.students.some(data => String(data.student) === String(req.user._id))) {
            res.json({ errorCode: 409, data: "Already Joined" });
            return;
        }
        course.students.push({ student: req.user._id });
        await course.save();
        res.json({ errorCode: -1, data: course });

    } catch (err) {
        console.log("join course err:" + err);
        res.json({ errorCode: 500, data: err });
        return;
    }
};

const getCourses = async (req, res, next) => {
    let user = await req.user;
    try {
        let courses = await Course
            .find({ "students.student": user._id })
            .populate("teacher", "-account -password -userType -__v")
            .select("-__v")
            .lean();
        console.log(courses);
        if (!courses) {
            res.json({ errorCode: 404, data: "Data Not Found" });
            return;
        }
        for (let i = 0; i < courses.length; i++) {
            let student = courses[i].students.find(data => String(data.student) === String(req.user._id));
            console.log(student);
            courses[i].grade = student.grade;
            courses[i].students = undefined;
        }
        console.log("get course success")
        res.json({ errorCode: -1, data: courses });
    } catch (err) {
        console.log("student get all course err:" + err)
        res.json({ errorCode: 500, data: err });
        return;
    }
};

module.exports = {
    verifyStudent,
    joinCourse,
    getCourses
}