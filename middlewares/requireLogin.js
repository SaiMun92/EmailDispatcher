// export a single function / snippet = lower case
// export a class = upper case naming
 module.exports = (req, res, next) => {
   if (!req.user) {
     return res.status(401).send({ error: 'You must log in!' });  //kick them out
   }

   // otherwise let the user continue to the next request handler
   next();
 };
