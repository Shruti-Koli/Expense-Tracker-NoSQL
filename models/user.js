const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  ispremiumuser: {
    type: Boolean
  },
  totalExpense: {
    type: Number,
    default: 0
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

    // userId: {
    //   type: Schema.Types.ObjectId,
    //   required: true,
    //   ref: 'User'







// const Sequelize = require('sequelize');

// const sequelize = require('../util/database');

// const Users = sequelize.define('user',{
//     id:{
//         type: Sequelize.INTEGER,
//         unique:true,
//         autoIncrement: true,
//         primaryKey:true,
//     },
//     name:{
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     email:{
//         type: Sequelize.STRING,
//         allowNull: false,
//         unique:true
//     },
//     password:{
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     ispremiumuser:{
//         type: Sequelize.BOOLEAN
//     },
//     totalExpense:{
//         type: Sequelize.INTEGER,
//         defaultValue :0
//     }
// });

// module.exports = Users;