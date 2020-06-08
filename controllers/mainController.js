const User = require("../models/user");
const Course = require("../models/course");

const getAllCourses = async (req, res, next) => {
    console.log("get all Courses");

    try {
        let courses = await Course
            .find()
            .select("-students")
            .lean();
        if (!courses) {
            res.json({ errorCode: 404, msg: "Not Found" });
        }
        res.json({ errorCode: -1, data: courses });

    } catch (err) {
        res.json({ errorCode: 500, msg: err });
    }
}

const getAllTeachers = async (req, res, next) => {
    console.log("get All teachers");

    try {
        let teachers = await User
            .find({ userType: 1 })
            .select("-password -userType -__v")
            .lean();
        if (!teachers) {
            res.json({ errorCode: 404, msg: "Not Found" });
        }
        res.json({ errorCode: -1, data: teachers });
    } catch (err) {
        res.json({ errorCode: 500, msg: err });
    }
}

module.exports = {
    getAllCourses,
    getAllTeachers
};