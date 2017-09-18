'use strict';

const config = require('./config');
const MongoClient = require('mongodb').MongoClient;

module.exports = {
  open () {
    return MongoClient
      .connect(config.DB_URL, {
        connectTimeoutMS: config.DB_CONNECT_TIMEOUT_MS
      });
  }
};
