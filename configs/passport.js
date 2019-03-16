const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../src/models/User.js');

passport.serializeUser((loggedInUser, cb) => {
  console.log('serialize');
  cb(null, loggedInUser.id);
});

passport.deserializeUser((userIdFromSession, cb) => {
  console.log('deserialize');
  User.findById(userIdFromSession, (err, userDocument) => {
    if (err) {
      cb(err);
      return;
    }
    cb(null, userDocument);
  });
});

passport.use(new LocalStrategy((username, password, next) => {
  User.findOne({ username }, (err, foundUser) => {
    if (err) {
      next(err);
      return;
    }
    if (!foundUser) {
      next(null, false, { message: 'Incorrect username.' });
      return;
    }
    if (!bcrypt.compareSync(password, foundUser.password)) {
      next(null, false, { message: 'Incorrect password.' });
      return;
    }
    next(null, foundUser);
  });
}));
