const express = require("express");
const router = express.Router();
const { addProject } = require("../controllers/projectController");
const { isLoggedIn, customRole } = require("../middlewares/user")

router.route("/addProject").post(isLoggedIn, customRole("admin"), addProject)

module.exports = router;