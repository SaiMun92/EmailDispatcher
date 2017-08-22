const express = require("express"); // node.js does not have common js modules.
// import express from 'express'; es2015 modules
const app = express();
// Node - Javascript runtine used to execute code outisde of the browser
// Express - Library that runs in the Node runtime. Has helpers to make dealing with HTTP traffc easier

// app = express App to register this route handler with
// get = Watch for incoming request with this method
// '/' = Watch for requests trying to access '/' route
// req =  Object reqpresenting the incoming requests
// res = Object representing the outgoing response
// res.send({ hi: 'there' }); = Immediately send some JSON back to who ever made this requests.
app.get("/", (req, res) => {
  res.send({ hi: "there" });
});

const PORT = process.env.PORT || 5000; // use whatever port heroku attempting to provide or just use port 5000
// watch for any trafic coming in from port 5000
app.listen(5000);
