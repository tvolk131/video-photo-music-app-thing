'use strict';
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const config = require('config')['passport'];
const User = require('../../db/models/user');
const bCrypt = require('bcryptjs');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  return User.getById(id)
    .then((user) => {
      if (!user) {
        throw profile;
      }
      done(null, user);
    })
    .error(error => {
      done(error, null);
    })
    .catch(() => {
      done(null, null, { message: 'No user found' });
    });
});

passport.use('local-signup', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
},
  (req, username, password, done) => {
    return User.getByUsername(username)
      .then((user) => {
        if (user) {
          return done(null, false, {
            message: 'Username is already taken'
          });
        } else {
          let generateHash = (password) => {
            return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
          };
          let data = {
            email,
            password: generateHash(password),
            firstname: req.body.firstname,
            lastname: req.body.lastname
          };
          User.create(data)
            .then((newUser) => {
              if (!newUser) {
                return done(null, false);
              } else {
                return done(null, newUser);
              }
            })
            .catch((err) => {
              return done(null, false, {
                message: 'Username is invalid'
              });
            });
        }
      });
  }));

passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
},
  (req, username, password, done) => {
    User.getByUsername(username)
      .then((user) => {
        let isValidPassword = (userpass, password) => {
          return bCrypt.compareSync(password, userpass);
        };
        if (!user || !isValidPassword(user.password, password)) {
          return done(null, false, {
            message: 'Incorrect username or password'
          });
        }
        return done(null, user.get());
      })
      .catch((err) => {
        console.error('Error: ' + err);
        return done(null, false, {
          message: 'Something went wrong with your sign-in'
        });
      });
  }));

// passport.use('google', new GoogleStrategy({
//   clientID: config.Google.clientID,
//   clientSecret: config.Google.clientSecret,
//   callbackURL: config.Google.callbackURL
// },
//   (accessToken, refreshToken, profile, done) => getOrCreateOAuthProfile('google', profile, done))
// );

// passport.use('facebook', new FacebookStrategy({
//   clientID: config.Facebook.clientID,
//   clientSecret: config.Facebook.clientSecret,
//   callbackURL: config.Facebook.callbackURL,
//   profileFields: ['id', 'emails', 'name']
// },
//   (accessToken, refreshToken, profile, done) => getOrCreateOAuthProfile('facebook', profile, done))
// );

// // REQUIRES PERMISSIONS FROM TWITTER TO OBTAIN USER EMAIL ADDRESSES
// passport.use('twitter', new TwitterStrategy({
//   consumerKey: config.Twitter.consumerKey,
//   consumerSecret: config.Twitter.consumerSecret,
//   callbackURL: config.Twitter.callbackURL,
//   userProfileURL: 'https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true'
// },
//   (accessToken, refreshToken, profile, done) => getOrCreateOAuthProfile('twitter', profile, done))
// );

// const getOrCreateOAuthProfile = (type, oauthProfile, done) => {
//   return models.Auth.where({ type, oauth_id: oauthProfile.id }).fetch({
//     withRelated: ['profile']
//   })
//     .then(oauthAccount => {

//       if (oauthAccount) {
//         throw oauthAccount;
//       }

//       if (!oauthProfile.emails || !oauthProfile.emails.length) {
//         // FB users can register with a phone number, which is not exposed by Passport
//         throw null;
//       }
//       return models.Profile.where({ email: oauthProfile.emails[0].value }).fetch();
//     })
//     .then(profile => {

//       let profileInfo = {
//         first: oauthProfile.name.givenName,
//         last: oauthProfile.name.familyName,
//         display: oauthProfile.displayName || `${oauthProfile.name.givenName} ${oauthProfile.name.familyName}`,
//         email: oauthProfile.emails[0].value
//       };

//       if (profile) {
//         //update profile with info from oauth
//         return profile.save(profileInfo, { method: 'update' });
//       }
//       // otherwise create new profile
//       return models.Profile.forge(profileInfo).save();
//     })
//     .tap(profile => {
//       return models.Auth.forge({
//         type,
//         profile_id: profile.get('id'),
//         oauth_id: oauthProfile.id
//       }).save();
//     })
//     .error(err => {
//       done(err, null);
//     })
//     .catch(oauthAccount => {
//       if (!oauthAccount) {
//         throw oauthAccount;
//       }
//       return oauthAccount.related('profile');
//     })
//     .then(profile => {
//       if (profile) {
//         done(null, profile.serialize());
//       }
//     })
//     .catch(() => {
//       // TODO: This is not working because redirect to login uses req.flash('loginMessage')
//       // and there is no access to req here
//       done(null, null, {
//         'message': 'Signing up requires an email address, \
//           please be sure there is an email address associated with your Facebook account \
//           and grant access when you register.' });
//     });
// };

module.exports = passport;
