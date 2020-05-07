const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport").Strategy;

/* Models */
const User = require("../models/user.js");

module.exports = async function (passport) {
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.getUserById(id, function (err, user) {
      done(err, user);
    });
  });

  passport.use(
    new LocalStrategy({
      passReqToCallback: true,
    }, (req, username, password, done) => {
      User.getUserByUsername(username, function (err, user) {
        console.log(user)
        if (err) throw err;
        if (!user) {
          req.flash('error_msg', "User Not Registered")
          return done(null, false);
        }

        User.comparePassword(password, user.password, function (err, isMatch) {
          if (err) throw err;
          if (isMatch) return done(null, user);
          else {
            req.flash('error_msg', "Invalid Password")
            return done(null, false);
          }
        });
      });
    })
  );
};