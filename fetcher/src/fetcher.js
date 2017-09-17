'use strict';

const Twitter = require('twitter');
const config = require('./config');
const queries = require('./queries');

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
        if (res) {
          console.log(`Max tweet id is: ${res._id}\n`);
        }

        const maxTweetId = res ? res._id : null;
        return twitterClient.get('search/tweets', {q: config.KEYWORDS_TO_FETCH, since_id: maxTweetId});
      })
      .then((result) => {
        const tweets = result.statuses;
        console.log(`Statuses are\n`);
        console.dir(tweets);

        const tweetsToInsert = tweets.map((tweet) => Object.assign({
          _id: tweet.id_str
        }, tweet));

        if (tweetsToInsert.length) {
          return queries.insertTweets(db, tweetsToInsert);
        }
      });
  }
};
