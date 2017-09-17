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
            format: 'EEE MMM dd HH:mm:ss ZZZZZ yyyy'
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
  }
};
