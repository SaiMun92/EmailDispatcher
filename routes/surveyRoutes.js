const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url'); // default nodejs library
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false
    });

    res.send(surveys);
  });

  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for voting!');
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice'); // pattern

    // map over the list of events and extract the required info
    _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      .compact() // compact function takes in an array and remove any elements that are undefined
      .uniqBy('email', 'surveyId') // remove duplicate contents
      .each(({ surveyId, email, choice }) => {
        // async code
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, reponded: false }
            }
          },
          {
            $inc: { [choice]: 1 }, // increment by one when there is a choice
            $set: { 'recipients.$.responded': true }, // update the property $ = looks at the sub document collection of recipients
            lastResponded: new Date()
          }
        ).exec(); // .exec() = execute the query
      })
      .value();

    res.send({});
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    // run the requreLogin function after the post request
    const { title, subject, body, recipients } = req.body;

    // Creating a new instance in mongodb
    const survey = new Survey({
      // title: title
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });

    // good place to send an email.
    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send(); // the send() function inside Mailer.js
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
