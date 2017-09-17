'use strict';

const database = require('./src/database');
const elastic = require('./src/elastic');
const indexer = require('./src/indexer');
const logger = require('./src/logger');

logger.info(`Indexer started\n`);

elastic.checkConnection()
  .then(() => {
    return database.open()
      .then((db) => {
        return indexer.reindexTweets(db)
          .then(() => {
            logger.info(`Tweets has been reindexed`);
            db.close();
          })
          .catch((err) => {
            logger.error(`Error indexing tweets `, err);
          });
      })
      .catch((err) => {
        logger.error(`Error connecting to db: `, err);
      });
  })
  .catch((err) => {
    logger.error(`Failed to connect to elasticsearch!`, err);
  });
