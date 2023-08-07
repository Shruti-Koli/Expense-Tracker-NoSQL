const Expense = require('../models/expense');
const User = require('../models/user');
const mongoose = require('../util/database');

function Invalidstring(str){
    if(str.trim().length==0 || str == undefined){
        return true;
    }else{
        return false;
    }
}

exports.getExpenses = async (req, res, next) => {
    try {
      const page = +req.query.page || 1;
      const pageSize = +req.query.pageSize || 3;
  
      const totalExpenses = await Expense.countDocuments({ user: req.user._id });
  
      const data = await Expense.find({ user: req.user._id })
        .sort({ id: -1 })
        .skip((page - 1) * pageSize)
        .limit(pageSize);
  
      res.status(200).json({
        allExpenses: data,
        currentPage: page,
        hasNextPage: pageSize * page < totalExpenses,
        nextPage: page + 1,
        hasPreviousPage: page > 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalExpenses / pageSize)
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: err });
    }
  };


  exports.deleteExpense = async (req, res, next) => {
    try {
      if (!req.params.id || req.params.id === 'undefined') {
        // Check for valid ID
        return res.status(400).json({ message: 'ID is missing' });
      }
  
      const uId = req.params.id;
      const expense = await Expense.findById(uId);
  
      if (!expense || expense.user.toString() !== req.user._id.toString()) {
        // Check if the expense exists and belongs to the current user
        return res.status(500).json({ success: false, message: 'You can not delete this expense' });
      }
  
      const user = await User.findById(req.user._id);
  
      if (!user) {
        return res.status(500).json({ success: false, message: 'User not found' });
      }
  
      const price = expense.price;
      const totalExpense = user.totalExpense - price;
  
      await user.updateOne({ totalExpense: totalExpense });
  
      await Expense.deleteOne({ _id: uId });
  
      res.status(200).json({ success: true, message: 'Deleted' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: err.message });
    }
  };


  exports.addExpense = async (req, res, next) => {
    try {
      const price = req.body.price.trim();
      const descr = req.body.descr.trim();
      const category = req.body.category.trim();
      console.log(`entry: ${price} ${descr} ${category}`);
  
      if (Invalidstring(price) || Invalidstring(descr) || Invalidstring(category)) {
        return res.status(400).json({ message: 'All the fields are mandatory' });
      }
  
      console.log('add Exp', price, descr, category);
  
      const expense = new Expense({
        price: price,
        descr: descr,
        category: category,
        user: req.user._id
      });
  
      await expense.save();
  
      const user = await User.findById(req.user._id);
  
      if (!user) {
        return res.status(500).json({ message: 'User not found' });
      }
  
      const totalExpense = user.totalExpense + Number(price);
      console.log('Price:', totalExpense);
  
      await user.updateOne({ totalExpense: totalExpense });
  
      res.status(201).json({ newExpense: expense });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  };
  