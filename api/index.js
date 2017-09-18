'use strict';

const app = require('./src/app');
const elastic = require('./src/elastic');
const logger = require('./src/logger');

const port = 3030;

logger.info(`Starting API server...`);

elastic.checkConnection()
  .then(() => {
    startApplication();
  })
  .catch((err) => {
    logger.error(`Error starting API server: `, err);
  });

function startApplication () {
  app.listen(port);

  logger.info(`Tweets Collector REST API server listening on port ${port}...`);
}
