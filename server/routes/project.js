const express = require("express");
const router = express.Router();
const { addProject, getOneProject, getAllProjectOfUser, getAllUsersOfProject, updateProject, getAllProjects, percentageCalculator } = require("../controllers/projectController");
const { isLoggedIn, customRole } = require("../middlewares/user")

router.route("/addProject").post(isLoggedIn, customRole("projectManager", "admin"), addProject);
router.route("/getOneProject/:id").get(isLoggedIn, getOneProject);
router.route("/getAllProjectOfUser").get(isLoggedIn, getAllProjectOfUser);
router.route("/getAllUsersOfProject").get(isLoggedIn, getAllUsersOfProject);
router.route("/updateProject/:id").put(isLoggedIn, updateProject);

router.route("/getAllProjects").get(getAllProjects)
router.route("/percentageCalculator").get(percentageCalculator)

module.exports = router;