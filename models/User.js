//Naming convention for models, use uppercase at beginning

const mongoose = require('mongoose');    //bring mongoose

//create schema(take obj with all fields)
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    //login with email & passw rather than having a separate field for username
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('user', UserSchema);
// mongoose.model('modelName', Schema)
