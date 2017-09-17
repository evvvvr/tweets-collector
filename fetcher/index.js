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
        logger.error(`getting past tweets failed: `, err);
      })
      .then(() => {
        db.close();
      });
  })
  .catch((err) => {
    logger.error(`error connecting to db: `, err);
  });
