'use strict';

module.exports = {
  getAllTweets (db) {
    return db.collection('tweets').find({}).toArray();
  },

  getNewTweets (db) {
    return db.collection('tweets').find({ 'metadata.indexed': false })
      .toArray();
  },

  markTweetsAsIndexed (db, tweets) {
    const indexedTweetsIds = tweets.map((t) => t._id);

    return db.collection('tweets').updateMany(
      { _id: { $in: indexedTweetsIds } },
      { $set: { 'metadata.indexed': true } }
    );
  }
};
