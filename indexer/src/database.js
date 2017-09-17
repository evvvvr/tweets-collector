'use strict';

const MongoClient = require('mongodb').MongoClient;

const mongoClientOptions = {
  connectTimeoutMS: 5000
};

module.exports = {
  open () {
    return MongoClient
      .connect('mongodb://192.168.99.100:27017/tweets-collector', mongoClientOptions);
  }
};
