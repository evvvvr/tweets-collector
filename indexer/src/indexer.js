'use strict';

const queries = require('./queries');
const elastic = require('./elastic');

module.exports = {
  reindexTweets (db) {
    let indexedTweets;

    return elastic.doesIndexExist()
      .then((indexExists) => {
        if (indexExists) {
          return elastic.deleteIndex();
        }
      })
      .then(() => {
        return elastic.createIndex();
      })
      .then(() => {
        return elastic.addMapping();
      })
      .then(() => {
        return queries.getAllTweets(db);
      })
      .then((tweets) => {
        indexedTweets = tweets;
        return elastic.bulkIndex(tweets);
      })
      .then(() => {
        return queries.markTweetsAsIndexed(db, indexedTweets);
      });
  },

  indexNewTweets (db) {
    let indexedTweets;

    return queries.getNewTweets(db)
      .then((tweets) => {
        indexedTweets = tweets;
        return elastic.bulkIndex(tweets);
      })
      .then(() => {
        return queries.markTweetsAsIndexed(db, indexedTweets);
      });
  }
};
