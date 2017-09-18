'use strict';

const elastic = require('./src/elastic');
const logger = require('./src/logger');

logger.info(`Starting API server...`);

elastic.checkConnection()
  .then(() => {
    logger.info(`Connected to elasticsearch`);

    return elastic.searchTweets('Foo 12');
  })
  .then((searchResult) => {
    console.log(`Result is:\n`);
    console.dir(searchResult);

    searchResult.hits.hits.forEach((res) => {
      console.log(`Result:`);
      console.dir(res);
      console.log(`\n`);
    });
  })
  .catch((err) => {
    logger.error(`Failed to connect to elasticsearch: `, err);
  });
