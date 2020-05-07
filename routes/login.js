const express = require("express");
const app = express.Router();
const passport = require("passport")

app.get("/", (req, res) => {
  res.render("login", {
    layout: false,
  });
});

app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/',
    failureFlash: true
  }),
  function (req, res) {
    res.redirect('/dashboard');
  }
);

module.exports = app;