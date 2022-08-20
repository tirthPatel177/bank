const express = require("express");
const userController = require("../controllers/userControllers");

const router = express.Router();

// router.route("/").get(userController.getAllUsers);
router.route("/").post(userController.login);


module.exports = router;
