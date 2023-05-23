const passport = require('passport');
const User = require('../models/User');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

let opts = {}

// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.jwtFromRequest = (req) => {
  if (req.query.auth){
    return req.query.auth
  }

  if(req.headers.authorization){
    return req.headers.authorization.split(' ')[1]
  }
  return null
}
opts.secretOrKey = '1234567890';

passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
  User.findOne({ username: jwt_payload.sub }, function (err, user) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
}));