const express = require('express'); // node.js does not have common js modules.
// import express from 'express'; es2015 modules
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');  // Parse in incoming request bodeis in a middleware before your handlers
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

// connect to Mongo
mongoose.connect(keys.mongoURI);

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());


// it turns into a function and immediately calls the express app function
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // link our main.js file, or main.css file!
  app.use(express.static('client/build')); // if there is no such route, look into the client/build directory

  // Express will serve up the index.html file
  // if it dosen't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000; // use whatever port heroku attempting to provide or just use port 5000
// watch for any trafic coming in from port 5000
app.listen(PORT);
