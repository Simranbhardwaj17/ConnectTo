//Naming convention for models, use uppercase at beginning

const mongoose = require('mongoose');  //bring mongoose

//create schema(take obj with all fields)
const UserSchema = new mongoose.Schema({ 
    name: {
        type: String,
        required:  true
    },
    email: {          //login with email &passw rather than having a separate field for username
        type: String,
        required:  true,
        unique: true
    },
    password: {
        type: String,
        required:  true
    },
    avatar: {
        type: String
    },
    date: {
        type: Date, 
        default: Date.now
    }
});

module.exports = User = mongoose.model('User', UserSchema);
// mongoose.model('modelName', Schema)

//Gravatar: allows u to attach a pfp img to ur email(I want to be this in user model so that its always accessible coz at 1st reg, it create user not pfp, have to go through process to create pfp)

//Avatar available right away. So, its here