const mongoose = require('mongoose');
//const Schema = mongoose.Schema;
const { Schema } = mongoose;

// Create the schema
const userSchema = new Schema({
  googleId: String,
  credits: { type: Number, default: 0 }
});

// we want to create a new collection called users. Mongo create it when it does not exist
mongoose.model('users', userSchema);
