const express = require('express');
const router = express.Router();
const passport = require('passport');

// Logout
router.get('/', function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }

    req.flash('success_msg', 'You are logged out');
    res.redirect('/login');
  });
});

module.exports = router;