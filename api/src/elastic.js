'use strict';

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

  searchTweets (text) {
    return elasticsearchClient.search({
      index: indexName,
      body: {
        query: {
          match: {
            text: {
              query: text,
              operator: 'and'
            }
          }
        },
        sort: [
          { createdAt: { order: 'desc' } }
        ],
        size: 100
      }
    });
  }
};
