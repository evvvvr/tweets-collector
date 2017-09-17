'use strict';

const database = require('./src/database');
const fetcher = require('./src/fetcher');
const logger = require('./src/logger');

logger.info(`Starting Fetcher...`);

database.open()
  .then((db) => {
    logger.info(`Fetching past tweets...`);

    fetcher.getPastTweets(db)
      .catch((err) => {
        logger.error(`Getting past tweets has failed: `, err);
      })
      .then(() => {
        logger.info(`Pulling new tweets...`);
        fetcher.startPullingNewTweets(db);
      });
  })
  .catch((err) => {
    logger.error(`error connecting to db: `, err);
  });
