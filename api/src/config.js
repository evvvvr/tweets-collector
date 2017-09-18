'use strict';

module.exports = {
  ELASTIC_HOST: process.env.ELASTIC_HOST,
  ELASTIC_CONNECT_TIMEOUT_MS: process.env.ELASTIC_CONNECT_TIMEOUT_MS,
  ELASTIC_LOG_LEVEL: process.env.ELASTIC_LOG_LEVEL,
  ELASTIC_INDEX_NAME: process.env.ELASTIC_INDEX_NAME,
  PORT: process.env.PORT
};
