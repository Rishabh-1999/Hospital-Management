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
    new LocalStrategy(function (username, password, done) {
      User.getUserByUsername(username, function (err, user) {
        console.log(user)
        if (err) throw err;
        if (!user) {
          return done(null, false, {
            message: "User Not Registered",
          });
        }

        User.comparePassword(password, user.password, function (err, isMatch) {
          if (err) throw err;
          if (isMatch) return done(null, user);
          else return done(null, false, "Invalid password");
        });
      });
    })
  );
};