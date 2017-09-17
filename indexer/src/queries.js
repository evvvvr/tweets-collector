'use strict';

module.exports = {
  getAllTweets (db) {
    return db.collection('tweets').find({}).toArray();
  }
};
