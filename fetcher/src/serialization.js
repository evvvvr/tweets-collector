'use strict';

module.exports = {
  serializeTweet: serializeTweet,

  serializeTweets (tweets) {
    return tweets.map((t) => serializeTweet(t));
  }
};

function serializeTweet (tweet) {
  return Object.assign({ _id: tweet.id_str }, tweet);
}
