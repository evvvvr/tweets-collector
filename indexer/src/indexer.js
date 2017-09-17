'use strict';

const queries = require('./queries');
const elastic = require('./elastic');

module.exports = {
  reindexTweets (db) {
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
        return elastic.bulkIndex(tweets);
      });
  }
};
