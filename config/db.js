const mongoose = require('mongoose');      // bring mongoose, to connect

//bring config pkg, to grab that str that is inside default.json
// const config = require('config');

//to get URI put that in a var cld db, do config.get & we can get any of the values in that json file
// const db = process.env.MONGO_URI;
require('dotenv').config();              // Load environment variables

//create async arrow fn, we need somethig to call within our server.js
//use try catch, if DB unable to connect & show error msg
//when use async/await, wrap it inside try catch block
//Since mongoose.connect() returns promise, put await before that
const connectDB = async () => {
  try {const db = process.env.MONGO_URI;
    await mongoose.connect(db);          //pass db as param & leave other for now
    console.log('MongoDB Connected...');
  } catch (err) {
    console.log(err.message);            //pass err value which has a msg prop in it
    //Exit process with failure
    process.exit(1);                     //to esc from the process with failure
  }
};

module.exports = connectDB;              //export the mthd

// const mongoose = require('mongoose');
// require('dotenv').config();           // Load environment variables

// const mongoURI = process.env.MONGO_URI;

// mongoose
//   .connect(mongoURI)
//   .then(() => console.log('MongoDB connected successfully'))
//   .catch((err) => console.error('MongoDB connection error:', err));
