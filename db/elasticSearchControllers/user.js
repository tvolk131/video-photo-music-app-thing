const elasticSearch = require('../../elasticSearch');
const dbUser = require('../models/user');

let User = {...dbUser};

User.create = (input) => {
  return dbUser.create(input)
    .tap((user) => {
      elasticSearch.indexUser(user);
    });
};

User.update = (userId, query) => {
  return dbUser.update(userId, query)
    .tap((user) => {
      elasticSearch.indexUser(user);
    });
};

module.exports = User;