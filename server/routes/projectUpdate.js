const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middlewares/user");
const { addProjectUpdate } = require("../controllers/projectUpdateController")


router.route("/addProjectUpdate").post(isLoggedIn, addProjectUpdate)




module.exports = router