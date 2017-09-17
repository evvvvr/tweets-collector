'use strict';

module.exports = {
  getTweetWithMaxId (db) {
    const options = { sort: [['_id', -1]], limit: 1 };

    return db.collection('tweets').findOne({}, options);
  },

  insertTweets (db, tweets) {
    return db.collection('tweets').insertMany(tweets);
  },

  insertTweet (db, tweet) {
    return db.collection('tweets').insert(tweet);
  }
};
