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
        console.log(`Tweets to index:\n`);
        console.dir(tweets.map((t) => mapTweet(t)));
      });
  }
};

function mapTweet (tweet) {
  return {
    id: tweet._id,
    text: tweet.text,
    createdAt: tweet.created_at,
    user: {
      name: tweet.user.name,
      screenName: tweet.user.screen_name
    }
  };
};
