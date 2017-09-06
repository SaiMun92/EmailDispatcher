const passport = require('passport');

module.exports = app => {
  // Route Handler
  // Authenticating request by using the Google strategy - req.user will be set to the authenticated user.
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get('/auth/google/callback', passport.authenticate('google'));

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.send(req.user);
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user); // send back to the user
  });
};

// app = express App to register this route handler with
// get = Watch for incoming request with this method
// '/' = Watch for requests trying to access '/' route
// req =  Object reqpresenting the incoming requests
// res = Object representing the outgoing response
// res.send({ hi: 'there' }); = Immediately send some JSON back to who ever made this requests.
