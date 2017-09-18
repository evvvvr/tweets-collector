'use strict';

module.exports = {
  error (message, err) {
    // eslint-disable-next-line no-console
    console.error(message, err, `\n`);
  },

  info (message) {
    // eslint-disable-next-line no-console
    console.log(`${message}\n`);
  }
};
