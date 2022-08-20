const express = require("express");
const adminControllers = require("../controllers/adminControllers");
const authorize = require("../helpers/authorize");
const Role = require("../helpers/role");

const router = express.Router();

router.route("/users/credit").post(adminControllers.credit);
router.route("/users/debit").post(adminControllers.debit);

router
  .route("/users")
  .get(adminControllers.getAllUsers)
  .post(adminControllers.createUser);

router.route("/bankdetails").get(adminControllers.getBankDetails);

// router
//   .route("/:id")
//   .get(userController.getUser)
//   .patch(userController.updateUser)
//   .delete(userController.deleteUser);

module.exports = router;
