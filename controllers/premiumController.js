const User = require('../models/user');
const PreviousDownloads = require('../models/previousdownloads');
const Expense = require('../models/expense');
const AWS = require('aws-sdk');

const S3services = require('../services/S3services');

const getPrevFiles = async (req, res) => {
  try {
    const prevdata = await PreviousDownloads.find({ user: req.user._id });
    res.status(200).json(prevdata);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};


const getFile = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user._id });
    const stringifiedExpenses = JSON.stringify(expenses);
    const userid = req.user._id;
    const filename = `Expenses${userid}/${new Date()}.txt`;
    const fileURL = await S3services.uploadToS3(stringifiedExpenses, filename);
    const prevdata = await PreviousDownloads.create({ fileURL: fileURL, createdAt: new Date(), user: req.user });

    res.status(200).json({ fileURL: fileURL, prevdata: prevdata });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};



const getUserLeaderBoard = async (req, res) => {
  try {
    const leaderBoarData = await User.find({}).sort({ totalExpense: -1 });
    res.status(200).json(leaderBoarData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

module.exports = {
  getUserLeaderBoard,
  getFile,
  getPrevFiles
};
