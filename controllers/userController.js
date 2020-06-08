const User = require("../models/user");

const getUserInfo = async (req, res, next) => {
    console.log("get user info");
    let payload = req.payload;
    console.log(payload);
    try {
        let user = await User
            .findOne({ account: payload.account })
            .select("-password -__v")
            .exec();
        if (!user) {
            res.json({ errorCode: 404, data: "Not Found" });
        }
        res.json({ errorCode: -1, data: user });

    } catch (err) {
        res.json({ errorCode: 500, data: err });
    }
}

const editUserInfo = async (req, res, next) => {
    console.log("edit user info");
    let payload = req.payload;
    let account = payload.account;
    console.log(account);
    let name = req.body.name;
    let email = req.body.email;
    let phone = req.body.phone;

    try {
        let user = await User
            .findOne({ account: account })
            .select("-password")
            .exec();
        console.log(user);
        if (!user) {
            res.json({ errorCode: 404, data: "Not Found" });
            return;
        }
        if (name != undefined) {
            user.name = name;
        }
        if (phone != undefined) {
            user.phone = phone;
        }
        if (email != undefined) {
            user.email = email;
        }

        user.save();
        res.json({ errorCode: -1, data: "Update Successful" })

    } catch (err) {
        res.json({ errorCode: 500, msg: err });
    }

};

const changePassword = async (req, res, next) => {
    console.log("change password");
    let payload = req.payload;
    let password = req.body.password;
    let newPassword = req.body.newPassword;
    let confirm = req.body.confirm;
    try {
        let user = await User
            .findOne({ account: payload.account })
            .select()
            .exec();
        console.log("user pwd:" + user.password);
        if (!user) {
            res.json({ errorCode: 404, data: "Not Found" });
            return;
        }
        if (password !== user.password) {
            res.json({ errorCode: 401, data: "Unauthorized" });
            return;
        } else {
            if (newPassword !== confirm) {
                res.json({ errorCode: 400, data: "Passwords don't match." });
                return;
            } else {
                user.password = newPassword;
                user.save();
                res.json({ errorCode: -1, data: "password updated" });
            }
        }
    } catch (err) {
        res.json({ errorCode: 500, data: err });
    }
};

const getAllUser = async (req, res, next) => {
    console.log("get user info");
    try {

        let user = await User
            .find()
            .select("-password -__v -_id")
            .exec();
        if (!user) {

            res.json({ errorCode: 404, data: "Not Found" });
        }
        console.log(user);
        res.json({ errorCode: -1, User: user });

    } catch (err) {
        console.log(err);
        res.json({ errorCode: 500, data: err });
    }
}

module.exports = {
    getUserInfo,
    editUserInfo,
    changePassword,
    getAllUser
};