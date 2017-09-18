'use strict';

const elastic = require('../elastic');
const logger = require('../logger');

module.exports = function search (req, res, next) {
  logger.info(`Search API endpoint requested`);

  const textRequiredError = {
    description: `q query param is required and should not be empty`
  };

  const text = req.query.q;

  if (!text) {
    return res.status(400).json({
      error: textRequiredError
    });
  }

  return elastic.searchTweets(text)
    .then((searchResult) => {
      return res.status(200).json(serializeSearchResult(searchResult));
    })
    .catch(next);

  function serializeSearchResult (searchResult) {
    return {
      count: searchResult.hits.hits.length,
      items: searchResult.hits.hits.map(serializeSearchResultItem)
    };

    function serializeSearchResultItem (item) {
      return {
        id: item._id,
        text: item._source.text,
        createdAt: item._source.createdAt,
        user: {
          name: item._source.user.name,
          screenName: item._source.user.screenName,
          profileImgUrl: item._source.user.profileImgUrl
        }
      };
    }
  }
};
