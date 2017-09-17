'use strict';

const Twitter = require('twitter');
const config = require('./config');
const {serializeTweet, serializeTweets} = require('./serialization');
const queries = require('./queries');
const logger = require('./logger');

const twitterClient = new Twitter({
  consumer_key: config.TWITTER_CONSUMER_KEY,
  consumer_secret: config.TWITTER_CONSUMER_SECRET,
  access_token_key: config.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: config.TWITTER_ACCESS_TOKEN_SECRET
});

module.exports = {
  getPastTweets (db) {
    return queries.getTweetWithMaxId(db)
      .then((res) => {
        const maxTweetId = res ? res._id : null;
        return twitterClient.get('search/tweets', {q: config.KEYWORDS_TO_FETCH, since_id: maxTweetId});
      })
      .then((result) => {
        const tweets = result.statuses;

        if (tweets.length) {
          return queries.insertTweets(db, serializeTweets(tweets));
        }
      });
  },

  startPullingNewTweets (db) {
    const stream = twitterClient.stream('statuses/filter', {track: config.KEYWORDS_TO_FETCH});

    stream.on('data', (tweet) => {
      queries.insertTweet(db, serializeTweet(tweet))
        .catch((err) => {
          logger.error(`Error inserting tweet`, err);
        });
    });

    stream.on('error', (err) => {
      logger.error(`Error fetching tweets`, err);
      throw err;
    });
  }
};
