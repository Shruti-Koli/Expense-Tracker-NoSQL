const mongoose = require('mongoose');
const { Schema } = mongoose;

const expenseSchema = new Schema({
  price: {
    type: Number,
    required: true
  },
  descr: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;




// const Sequelize = require('sequelize');
// const sequelize = require('../util/database');

// const Expense = sequelize.define('expense',
//     {
//         id:{
//             type:Sequelize.INTEGER,
//             unique:true,
//             allowNull:false,
//             autoIncrement:true,
//             primaryKey:true
//         },
//         price:{
//             type: Sequelize.INTEGER,
//             allowNull:false
//         },
//         descr:{
//             type: Sequelize.STRING,
//             allowNull:false
//         },
//         category:{
//             type: Sequelize.STRING,
//             allowNull:false
//         }
//     }
// );

// module.exports = Expense;

