const Transaction = require("../models/transaction");
const user = require("../models/user");

exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.status(200).json({
      status: "success",
      data: {
        transactions,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getUserTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      $or: [
        { "from.accountNo": req.body.accountNo },
        { "to.accountNo": req.body.accountNo },
      ],
    }).sort({ date: -1 });
    res.status(200).json({
      status: "success",
      data: {
        transactions,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.transfer = async (req, res) => {
  try {
    const { from, to, amount } = req.body;
    let sender = await user.findOne({ accountNo: from.accountNo });
    let receiver = await user.findOne({ accountNo: to.accountNo });
    if (sender.balance < amount) {
      res.status(400).json({
        status: "fail",
        message: "Insufficient balance",
      });
      return;
    }
    sender.balance -= amount;
    receiver.balance += amount;
    await sender.save();
    await receiver.save();
    const transaction = await Transaction.create({
      from,
      to,
      amount,
    });
    res.status(200).json({
      status: "success",
      data: {
        transaction,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
