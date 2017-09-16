'use strict';

const Twitter = require('twitter');
const config = require('./src/config');

// eslint-disable-next-line no-console
console.log(`Fetcher started\n`);

const twitterClient = new Twitter({
  consumer_key: config.TWITTER_CONSUMER_KEY,
  consumer_secret: config.TWITTER_CONSUMER_SECRET,
  access_token_key: config.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: config.TWITTER_ACCESS_TOKEN_SECRET
});

twitterClient.get('search/tweets', {q: config.KEYWORDS_TO_FETCH})
  .then((result) => {
    // eslint-disable-next-line no-console
    console.dir(result.statuses);
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.log(`Error fetching tweets`);
    // eslint-disable-next-line no-console
    console.dir(err);
  });
