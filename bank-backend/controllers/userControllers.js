const { authenticate } = require("../helpers/user.service");
const User = require("../models/user");

exports.getUser = async (req, res) => {
  try {
    // const user = User.findById("62fd00a982d87ce19e808c12");
    const user = await User.findOne({ accountNo: req.params.id });
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

exports.login = async (req, res, next) => {
  console.log(req.body);
  authenticate({
    username: req.body.email,
    password: req.body.password,
  })
    .then((user) =>
      user
        ? res.status(200).json({
            status: "success",
            data: { ...user["_doc"], token: user["token"] },
          })
        : res.status(400).json({ message: "Username or password is incorrect" })
    )
    .catch((err) => next(err));
};

exports.transfer = (req, res) => {};
