const express = require("express");
const router = express.Router();
const { addProject } = require("../controllers/projectController");
const { isLoggedIn, customRole } = require("../middlewares/user")

router.route("/addProject").post(isLoggedIn, customRole("projectManager"), addProject)

module.exports = router;