const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    account: { type: String, unique: true, require: true },
    password: { type: String, require: true },
    email: String,
    name: String,
    phone: String,
    userType: { type: Number, require: true }
});

module.exports = mongoose.model("User", userSchema);