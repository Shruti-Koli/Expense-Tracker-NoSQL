const mongoose = require('mongoose');
const { Schema } = mongoose;

const previousDownloadSchema = new Schema({
  fileURL: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const PreviousDownload = mongoose.model('PreviousDownload', previousDownloadSchema);

module.exports = PreviousDownload;


// const Sequelize = require('sequelize')
// const sequelize = require('../util/database')

// const PreviousDownload = sequelize.define('PreviousDownloads', {
//     id:{
//         type: Sequelize.INTEGER,
//         unique:true,
//         autoIncrement: true,
//         primaryKey:true,
//     },
//     fileURL:{
//         type: Sequelize.STRING,
//         allowNull: false
//     }
// })


// module.exports =  PreviousDownload