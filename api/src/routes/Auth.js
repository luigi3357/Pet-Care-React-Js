var express = require('express');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oidc');
var router = express.Router();
var db = require('../db');

passport.use(new GoogleStrategy({
  clientID: process.env['GOOGLE_CLIENT_ID'],
  clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
  callbackURL: 'http://localhost:3000/'
},
function(issuer, profile, cb) {
  db.get('SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?', [
    issuer,
    profile.id
  ], function(err, cred) {
    if (err) { return cb(err); }
    if (!cred) {
      // The Google account has not logged in to this app before.  Create a
      // new user record and link it to the Google account.
      db.run('INSERT INTO users (name) VALUES (?)', [
        profile.displayName
      ], function(err) {
        if (err) { return cb(err); }

        var id = this.lastID;
        db.run('INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)', [
          id,
          issuer,
          profile.id
        ], function(err) {
          if (err) { return cb(err); }
          var user = {
            id: id.toString(),
            name: profile.displayName
          };
          return cb(null, user);
        });
      });
    } else {
      // The Google account has previously logged in to the app.  Get the
      // user record linked to the Google account and log the user in.
      db.get('SELECT * FROM users WHERE id = ?', [ cred.user_id ], function(err, user) {
        if (err) { return cb(err); }
        if (!user) { return cb(null, false); }
        return cb(null, user);
      });
    }
  });
}
));
router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/login/federated/google', passport.authenticate('google',{
  scope:["profile"]
}));

router.get('/',
  passport.authenticate('google', { failureRedirect: '/login', failureMessage: true }),
  function(req, res) {
    res.redirect('/');
  });
passport.serializeUser(function(user, cb) {
  console.log(user)
  process.nextTick(function() {
    cb(null, { id: user.id, username: user.username, name: user.name });
  });
});

passport.deserializeUser(function(user, cb) {
  console.log(user)
  process.nextTick(function() {
    return cb(null, user);
  });
});

router.post('/logout', function(req, res, next) {  
  req.logout();
  res.redirect('/');
});

module.exports = router;