const express = require('express'); // node.js does not have common js modules.
// import express from 'express'; es2015 modules
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

// connect to Mongo
mongoose.connect(keys.mongoURI);

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app); 

const PORT = process.env.PORT || 5000; // use whatever port heroku attempting to provide or just use port 5000
// watch for any trafic coming in from port 5000
app.listen(PORT);
