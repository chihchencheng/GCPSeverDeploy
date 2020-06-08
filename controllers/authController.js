const jwt = require("jsonwebtoken");
const User = require("../models/user")

const config = require("../configs");

const login = async (req, res, next) => {
    console.log("login");
    let account = req.body.account;
    let password = req.body.password;
    if (account === undefined || password === undefined) {
        res.json({ errorCode: 400, data: "Invalid parameters" });
        return;
    }

    try {
        let user = await User
            .findOne({ account, password })
            .exec();
        if (!user) {
            res.json({ errorCode: 401, data: "Invalid account/password" });
            return;
        }
        let token = jwt.sign({ account: user.account }, config.salt, { expiresIn: 60 * 60 * 24 });
        res.json({ errorCode: -1, data: token });
    } catch (err) {
        res.json({ errorCode: 500, data: err });
    }
}

const verify = async (req, res, next) => {
    console.log("auth verify user")
    let token = req.headers["x-access-token"];
    try {
        req.payload = jwt.verify(token, config.salt);
        console.log("auth verify success");
        next();
    } catch (err) {
        res.json({ errorCode: 401, data: "verify err" });
    }
}

const register = async (req, res, next) => {
    let account = req.body.account;
    let password = req.body.password;
    let confirm = req.body.confirm;
    let userType = req.body.userType;
    let email = req.body.email;
    let name = req.body.name;
    let phone = req.body.phone;

    if (account === undefined || password === undefined || userType === undefined) {
        console.log("Invalid Parameter");
        res.json({ errorCode: 400, data: "Invalid Parameter" });
        return;
    }
    if (password != confirm) {
        console.log("passwords dont't match");
        res.json({ errorCode: 400, data: "Invalid Password" });
        return;
    }
    // console.log(userType)
    // if (userType != 0 || userType != 1) {////////|| userType !== 1
    //     console.log("Wrong userType");
    //     res.json({ errorCode: 400, data: "wrong userType" });
    //     return;
    // }

    let user = new User({
        account, password, userType, email, name, phone
    });
    try {
        await user.save();
        res.json({ errorCode: -1, data: user });
    } catch (err) {
        res.json({ errorCode: 400, data: err });
    }

}

module.exports = {
    login,
    verify,
    register
};