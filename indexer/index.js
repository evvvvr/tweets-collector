'use strict';

const schedule = require('node-schedule');
const database = require('./src/database');
const elastic = require('./src/elastic');
const indexer = require('./src/indexer');
const logger = require('./src/logger');
const config = require('./src/config');

logger.info(`Indexer started`);

elastic.checkConnection()
  .then(() => {
    return database.open()
      .then((db) => {
        return indexer.reindexTweets(db)
          .then(() => {
            logger.info(`Tweets has been reindexed`);

            const cronSpec = config.INDEXER_JOB_CRON_SPEC;
            logger.info(`Scheduling indexer job with cron spec '${cronSpec}'`);

            schedule.scheduleJob(cronSpec, () => {
              logger.info(`Indexing new tweets...`);

              return indexer.indexNewTweets(db)
                .then(() => {
                  logger.info(`New tweets has been indexed`);
                })
                .catch((err) => {
                  logger.error(`Error indexing tweets: `, err);
                });
            });
          })
          .catch((err) => {
            logger.error(`Error renidexing tweets: `, err);
          });
      })
      .catch((err) => {
        logger.error(`Error connecting to db: `, err);
        process.exit(-2);
      });
  })
  .catch((err) => {
    logger.error(`Failed to connect to elasticsearch: `, err);
    process.exit(-1);
  });
