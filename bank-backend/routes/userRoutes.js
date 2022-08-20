const express = require("express");
const userController = require("../controllers/userControllers");
const authorize = require("../helpers/authorize");

const router = express.Router();

// router.route("/").get(userController.getAllUsers);

router.route("/:id").get(userController.getUser);
//   .patch(userController.updateUser)
//   .delete(userController.deleteUser);

module.exports = router;
