const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const favicon = require('serve-favicon');
const createAdmin = require('./config/createAdmin.js');
const cors = require('cors')
const app = express();
app.use(express.json())

require('./config/mkDirs.js')
require('./config/passport');

const db = require('./config/keys').mongoURI;

mongoose
  .connect(
    db,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

createAdmin();

app.use(cors())
app.use(express.static("public"));
app.use('/file', passport.authenticate('jwt', {session: false}), express.static("books"));
app.use(express.urlencoded({
  extended: false
}));


app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());



app.get('/', (req, res) => res.redirect('/login'));
app.use('/login', require('./routes/login.js'));
app.use('/book',passport.authenticate('jwt', {session: false}),  require('./routes/book.js'))
app.use('/user', passport.authenticate('jwt', {session: false}), require('./routes/user.js'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on  ${PORT}`));