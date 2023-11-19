const User = require("../models/user");
const jwt = require("jsonwebtoken");
const CustomError = require("../utilis/customError");

exports.isLoggedIn = async (req, res, next) => {
    let token = req.cookies.token;

    if (!token && req.header("Autorization")) {
        token = req.header("Authorization").replace("Bearer", "");
    }

    if (!token) {
        return (next(new CustomError("Login to access this page", 401)));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);
    next();
}

exports.customRole = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return (next(new CustomError("Access Denied", 403)));
        }
        next();
    }
}