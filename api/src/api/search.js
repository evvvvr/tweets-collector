'use strict';

const logger = require('../logger');

module.exports = function search (req, res, next) {
  logger.info(`In search handler`);
  return res.sendStatus(200);
};
