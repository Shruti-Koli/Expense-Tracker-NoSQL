const mongoose = require('mongoose');
const { Schema } = mongoose;

const forgotPasswordSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  active: {
    type: Boolean
  },
  expiresby: {
    type: Date
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const ForgotPassword = mongoose.model('ForgotPassword', forgotPasswordSchema);

module.exports = ForgotPassword;



// const Sequelize = require('sequelize');
// const sequelize = require('../util/database');


// const Forgotpassword = sequelize.define('forgotpassword', {
//     id: {
//         type: Sequelize.UUID,
//         allowNull: false,
//         primaryKey: true
//     },
//     active: {
//         type: Sequelize.BOOLEAN
//     },
//     expiresby: {
//         type: Sequelize.DATE
//     }
// })

// module.exports = Forgotpassword;