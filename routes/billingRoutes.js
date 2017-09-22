const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
// the above statement is the same as this one, just a shortcut. Read the api docs for the usecase
// var stripe = require('stripe')("sk_test_dssadasdasd");
const requireLogin = require('../middlewares/requireLogin');

// find the call that returns a promise and then add an await keyword and pass it off to a new variable
module.exports = app => {
  app.post('/api/stripe', requireLogin, async (req, res) => {
    // if(!req.user) { // if there is no user, send a message
    //   return res.status(401).send({ error: 'You must log in!' });
    // } == requireLogin

    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id
    });

    // modify the user model credits. User model has googleId and credits.
    req.user.credits += 5;
    const user = await req.user.save(); // async request

    res.send(user);
  });
};
