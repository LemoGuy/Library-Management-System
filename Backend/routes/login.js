const express = require('express');
const router = express.Router();
const User = require('../models/User');
let jwt = require('jsonwebtoken');
let crypto = require('crypto');
const bcrypt = require('bcryptjs')
const passport = require('passport');


// Login
router.post('/', async (req, res) => {
  let user = await User.findOne({ "username": req.body.username })
  if (!user) {
    res.sendStatus(404)
    return
  }

  if (!await bcrypt.compare(req.body.password, user.password)) {
    res.sendStatus(404)
    return
  }

  let token = jwt.sign({
    "sub": user.username,
    "role": user.type
    // "exp": (new Date()).getTime() + 3600
  }, "1234567890")
  res.send({ token })
});

router.get('/tempauth', passport.authenticate('jwt', { session: false }), (req, res) => {
  let token = jwt.sign({
    "sub":req.user.username,
    // "exp": (new Date()).getTime() + 20
  }, "1234567890", {expiresIn: '10s'})
  res.send({ token })
})
module.exports = router;