'use strict';

const app = require('./src/app');
const elastic = require('./src/elastic');
const config = require('./src/config');
const logger = require('./src/logger');

logger.info(`Starting API server...`);

elastic.checkConnection()
  .then(() => {
    startApplication();
  })
  .catch((err) => {
    logger.error(`Error starting API server: `, err);
    process.exit(-1);
  });

function startApplication () {
  const port = config.PORT;

  app.listen(port);
  logger.info(`Tweets Collector REST API server listening on port ${port}...`);
}
