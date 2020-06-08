const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    name: { type: String, require: true },
    desc: String,
    teacher: { type: Schema.Types.ObjectId, ref: "User" },
    students: [{
        student: { type: Schema.Types.ObjectId, ref: "User" },
        grade: { type: String, default: "F" }
    }]
});

module.exports = mongoose.model("Course", courseSchema);