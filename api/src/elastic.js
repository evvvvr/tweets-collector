'use strict';

const elasticsearch = require('elasticsearch');
const config = require('./config');

const elasticsearchClient = new elasticsearch.Client({
  host: config.ELASTIC_HOST,
  log: config.ELASTIC_LOG_LEVEL,
  apiVersion: '5.6'
});
const indexName = config.ELASTIC_INDEX_NAME;

module.exports = {
  checkConnection () {
    return elasticsearchClient.ping({
      requestTimeout: config.ELASTIC_CONNECT_TIMEOUT_MS
    });
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
