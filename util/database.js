const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
require('dotenv').config();
//'mongodb+srv://maximilian:9u4biljMQc4jjqbe@cluster0-ntrwp.mongodb.net/test?retryWrites=true',
//process.env.MONGO_URL

const mongoConnect = callback => {
  MongoClient.connect(    
    process.env.MONGO_URL
  )
    .then(client => {
      console.log('Connected!');
      callback(client);
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = mongoConnect;