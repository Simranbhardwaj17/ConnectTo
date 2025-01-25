const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    //create a reference to the user model,Because every profile should be associated with the user. So let's go ahead and add user.
    user: {
        type: mongoose.Schema.Types.ObjectId,     //every user have unique id
        ref: 'user'
    },
    company: {
        type: String
    },
    website: {
        type: String
    },
    location: {
        type: String
    },
    status: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    bio: {
        type: String
    },
    githubusername: {
        type: String
    },
    experience: [
      {
        title: {
            type: String,
            required: true
        },
        company: {
            type: String,
            required: true
        },
        location: {
            type: String
        },
        from: {
            type: Date,
            required: true
        },
        to: {
            type: Date
        },
        current: {
            type: Boolean,
            default: false
        },
        description: {
            type: String
        }
      }
    ],
    education: [
      {
        school: {
            type: String,
            required: true
        },
        degree: {
            type: String,
            required: true
        },
        fieldofstudy: {
            type: String,
            required: true
        },
        from: {
            type: Date,
            required: true
        },
        to: {
            type: Date
        },
        current: {
            type: Boolean, // Boolean. So if they currently work there, they'll have a checkbox for them to check off. And in the UI, if they check the current check box,
            //  it'll disable the to field coz they still work there.So we'll do stuff like that within React
            default: false
        },
        description: {
            type: String
        }
      }
    ],
    social: {
      youtube: {
          type: String
      },
      twitter: {
          type: String
      },
      facebook: {
          type: String
      },
      linkedin: {
          type: String
      },
      instagram: {
          type: String
      }
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('profile', ProfileSchema);