const elasticsearch = require('elasticsearch');

const elasticsearchClient = new elasticsearch.Client({
  host: '192.168.99.100:9200',
  apiVersion: '5.6',
  log: 'trace'
});
const indexName = 'tweets';

module.exports = {
  checkConnection () {
    return elasticsearchClient.ping({ requestTimeout: 5000 });
  },

  doesIndexExist () {
    return elasticsearchClient.indices.exists({ index: indexName });
  },

  deleteIndex () {
    return elasticsearchClient.indices.delete({ index: indexName });
  },

  createIndex () {
    return elasticsearchClient.indices.create({ index: indexName });
  },

  addMapping () {
    return elasticsearchClient.indices.putMapping({
      index: indexName,
      type: 'tweet',
      body: {
        properties: {
          id: { type: 'keyword' },
          text: { type: 'text' },
          createdAt: {
            type: 'date',
            format: 'EEE MMM dd HH:mm:ss Z yyyy'
          },
          user: {
            properties: {
              name: { type: 'text' },
              screenName: { type: 'text' }
            }
          }
        }
      }
    });
  },

  bulkIndex (tweets) {
    const bulkBody = tweets
      .map((t) => getBulkBodyForTweet(t))
      .reduce((res, tweetBulkBody) => res.concat(tweetBulkBody), []);

    return elasticsearchClient.bulk({ body: bulkBody });

    function getBulkBodyForTweet (tweet) {
      return [
        { index: { _index: 'tweets', _type: 'tweet', _id: tweet._id } },
        mapTweet(tweet)
      ];

      function mapTweet (tweet) {
        return {
          text: tweet.data.text,
          createdAt: tweet.data.created_at,
          user: {
            name: tweet.data.user.name,
            screenName: tweet.data.user.screen_name,
            profileImgUrl: tweet.data.user.profile_image_url
          }
        };
      }
    }
  }
};
