const express = require("express");
const transactionController = require("../controllers/transactionControllers");
const authorize = require("../helpers/authorize");

const router = express.Router();

// router.route("/").get(userController.getAllUsers);

router
  .route("/")
  .get(transactionController.getAllTransactions)
  .post(transactionController.getUserTransactions);

router.route("/transfer").post(transactionController.transfer);
//   .patch(userController.updateUser)
//   .delete(userController.deleteUser);

module.exports = router;
