const session = require('express-session');
const Store = require('connect-session-sequelize')(session.Store);
const db = require('../../db');
let store = new Store({db: db.connection});

module.exports.verify = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

module.exports.session = session({
  store,
  secret: 'more laughter, more love, more life',
  resave: true,
  saveUninitialized: false
});
