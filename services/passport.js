// House all the configurations for passport
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

// To generate the identifying piece of info
passport.serializeUser((user, done) => {
  // first argument is usually a error
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: 'https://arcane-mesa-36727.herokuapp.com/auth/google/callback',
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          // we already have a reacord with the given profile ID
          // The done() is to tell passport that we have finished creating a user and it should now resume the auth process
          done(null, existingUser);
        } else {
          // we don't have a user record with this ID, make a new record
          // Create a new instance of the user, still inside the Javascript api => need .save()
          new User({ googleId: profile.id })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);
