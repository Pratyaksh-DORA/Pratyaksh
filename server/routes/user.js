const express = require("express");
const router = express.Router();
const { signup, login, logout, createUser } = require("../controllers/userController");
const { isLoggedIn, customRole } = require("../middlewares/user")


// all user routes
router.route("/login").post(login)
router.route("/logout").get(logout)

// admin routes
router.route("/signup").post(signup)
router.route("/createUser").post(isLoggedIn, customRole("admin", "projectManager"), createUser)



module.exports = router