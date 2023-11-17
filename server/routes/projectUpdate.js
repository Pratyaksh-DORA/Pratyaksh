const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middlewares/user");
const { addProjectUpdate, getAllUpdatesOfProject } = require("../controllers/projectUpdateController")


router.route("/addProjectUpdate").post(isLoggedIn, addProjectUpdate);
router.route("/getAllUpdatesOfProject").get(isLoggedIn, getAllUpdatesOfProject)




module.exports = router