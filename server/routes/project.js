const express = require("express");
const router = express.Router();
const { addProject, getOneProject, getAllProjectOfUser } = require("../controllers/projectController");
const { isLoggedIn, customRole } = require("../middlewares/user")

router.route("/addProject").post(isLoggedIn, customRole("projectManager"), addProject);
router.route("/getOneProject/:id").post(isLoggedIn, getOneProject);
router.route("/getAllProjectOfUser").get(isLoggedIn, getAllProjectOfUser)

module.exports = router;