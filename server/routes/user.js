const express = require("express");
const router = express.Router();
const { signup, login, logout, createProjectManager } = require("../controllers/userController");
const { isLoggedIn, customRole } = require("../middlewares/user")


router.route("/signup").post(signup)
router.route("/login").post(login)
router.route("/logout").get(logout)

router.route("/admin/createProjectManager").post(isLoggedIn, customRole("admin"), createProjectManager)


module.exports = router