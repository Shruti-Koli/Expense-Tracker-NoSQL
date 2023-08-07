const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
//'mongodb+srv://maximilian:9u4biljMQc4jjqbe@cluster0-ntrwp.mongodb.net/test?retryWrites=true',

const mongoConnect = callback => {
  MongoClient.connect(    
    'mongodb+srv://user1:user1user1@cluster0.gshg64l.mongodb.net/'
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