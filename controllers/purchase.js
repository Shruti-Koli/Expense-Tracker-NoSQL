const Razorpay = require('razorpay');
const Order = require('../models/orders');
const userController = require('./userController');
require('dotenv').config();

exports.purchasePremium = async (req, res) => {
  try {
    var rzp = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    });

    const amount = 250000;

    rzp.orders.create({ amount, currency: "INR" }, async (err, order) => {
      if (err) {
        throw new Error(JSON.stringify(err));
      }

      await Order.create({ orderid: order.id, status: 'PENDING', user: req.user._id });

      return res.status(201).json({ order, key_id: rzp.key_id });
    });
  } catch (err) {
    console.error(err);
    res.status(403).json({ message: 'Something went wrong', error: err });
  }
};


exports.updateTransactionStatus = async (req, res) => {
    try {
      console.log("inside---------")  
      const userId = req.user._id;
      const { payment_id, order_id } = req.body;
      const order = await Order.findOne({ orderid: order_id });
  
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
  
      order.paymentid = payment_id;
      order.status = 'SUCCESSFUL';
      await order.save();
  
      req.user.ispremiumuser = true;
      await req.user.save();
  
      return res.status(202).json({
        success: true,
        message: 'Transaction Successful',
        token: userController.generateToken(userId, undefined, true),
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err, message: 'Something went wrong' });
    }
  };

exports.updateFailedTransactionStatus = async (req, res) => {
  try {
    const userId = req.user._id;
    const { order_id } = req.body;
    const order = await Order.findOne({ orderid: order_id });

    await order.updateOne({ status: 'FAILED' });

    return res.status(202).json({
      success: true,
      message: "Payment status updated",
      token: userController.generateToken(userId, undefined, false)
    });
  } catch (err) {
    console.error(err);
    res.status(403).json({ error: err, message: 'Something went wrong' });
  }
};
