const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function generateString(length) {
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

exports.createUser = async (req, res) => {
  try {
    let accountNo = "";
    let user = {};
    do {
      accountNo = generateString(16);
      let user = await User.findOne({
        accountNo,
      });
    } while (Object.keys(user).length !== 0);
    let hash = "";
    console.log("Here");

    if (req.body["password"]) {
      hash = bcrypt.hashSync(req.body.password, 10);
    }
    const newUser = await User.create({
      ...req.body,
      accountNo,
      hash,
    });

    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

// Might have to create new schema for this
// As of now the money credited and debited are generated from thin air
exports.credit = async (req, res) => {
  try {
    const user = await User.findOne({ accountNo: req.body.accountNo });
    console.log(user, req.body.accountNo);

    user.balance += Number(req.body.amount);

    await user.save();

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.debit = async (req, res) => {
  try {
    const user = await User.findOne({ accountNo: req.body.accountNo });

    if (user.balance < Number(req.body.amount)) {
      return res.status(400).json({
        status: "fail",
        message: "Insufficient funds",
      });
    }
    user.balance -= Number(req.body.amount);

    await user.save();

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getBankDetails = async (req, res) => {
  try {
    const users = await User.find();
    console.log(req.user);
    let totalDeposit = 0;
    let totalUsers = 0;
    users.forEach((user) => {
      totalDeposit += user.balance;
      if (user.role === "user") totalUsers++;
    });
    res.status(200).json({
      status: "success",
      data: {
        totalDeposit,
        totalUsers,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Something went wrong",
      message: err,
    });
  }
};

/**
 *
 * TODO: Only send back users that have a role of user
 *
 */
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Something went wrong",
      message: err,
    });
  }
};
