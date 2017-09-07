const express = require('express');
const middleware = require('../middleware');

const router = express.Router();

router.get('/', middleware.auth.verify);

router.post('/login', middleware.passport.authenticate('local-login', {
  successRedirect: '/'
}));

router.post('/signup', middleware.passport.authenticate('local-signup', {
  successRedirect: '/'
}));

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

router.get('/auth/google', middleware.passport.authenticate('google', {
  scope: ['email', 'profile']
}));

router.get('/auth/google/callback', middleware.passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

router.get('/auth/facebook', middleware.passport.authenticate('facebook', {
  scope: ['public_profile', 'email']
}));

router.get('/auth/facebook/callback', middleware.passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

// router.get('/auth/twitter', middleware.passport.authenticate('twitter'));

// router.get('/auth/twitter/callback', middleware.passport.authenticate('twitter', {
//   successRedirect: '/',
//   failureRedirect: '/login'
// }));

module.exports = router;
