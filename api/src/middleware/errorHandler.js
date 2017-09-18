'use strict';

const logger = require('../logger');

module.exports = function errorHandler (err, req, res, next) {
  const errorResponse = {
    error: {
      description: 'Internal server error'
    }
  };

  if (err) {
    logger.error(`Server error happened: `, err);
    return res.status(500).json(errorResponse);
  }

  return next();
};
