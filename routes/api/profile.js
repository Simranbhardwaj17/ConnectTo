const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
// bring in normalize to give us a proper url, regardless of what user entered
const normalize = require('normalize-url');
// import normalizeUrl from 'normalize-url';     //for new-version, use import
const checkObjectId = require('../../middleware/checkObjectId');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

//We do router.get('/', callbk) req        for callbk use arr fn with req res
// @route     GET api/profile/me           api/profile is for all pfp
// @desc      Get current users profile
// @access    Private            coz we r getting the profile by user id that's in the token. so they have to send a token, which means we need to bring in the auth middleware and add that.
// add auth as a second parameter. So, whatever routes we want to protect, that's all we have to do is add that as a second parameter.
router.get('/me', auth, async (req, res) => {
  try {
    //create a variable called profile, and set that to await, because we're going to call our model method
    //call dot findOne, because we're only finding one, and we want to find it by the user,we have access to request dot user & we want to get it by the id.
    //use a mthd cld populate, to pop.. this with the name of the user and the avatar.
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'avatar']
    );

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// we're gonna create the route to actually create or update a profile. So this is probably gonna be our longest route, like the most code within a single route.

// @route     POST api/profile          api/profile is for all pfp
// @desc      Create or Update user profile
// @access    Private
// URL or the endpoint is slash only coz of /pfp only
// we need to use the auth middleware, but we also need to use the validation middleware, so what we have to do in that case is put in a set of brackets like this, and put the first middleware which is auth, and then the second one is the brackets with the checks.
router.post( '/', [
  auth,
    [
      check('status', 'Status is required').not().isEmpty(),
      check('skills', 'Skills is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      website,
      skills,
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook,
      // spread the rest of the fields we don't need to check
      ...rest
    } = req.body;

    //Build profile object
    const profileFields = {
      user: req.user.id,
      website:
        website && website !== ''
          ? normalize(website, { forceHttps: true })
          : '',
      skills: Array.isArray(skills)
        ? skills
        : skills.split(',').map((skill) => ' ' + skill.trim()),
      ...rest
    };

    // Build socialFields object
    const socialFields = { youtube, twitter, instagram, linkedin, facebook };

    // normalize social fields to ensure valid url
    for (const [key, value] of Object.entries(socialFields)) {
      if (value && value.length > 0)
        socialFields[key] = normalize(value, { forceHttps: true });
    }
    // add to profileFields
    profileFields.social = socialFields;

    try {
      // Using upsert option (creates new doc if no match is found):
      let profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/profile
// @desc     Get all profiles
// @access   Public
router.get('/', async (req, res) => {
  try {
     //create a variable called profiles, and get those by saying await using Profile model, use the find method.
     // Now, add the name and the avatar, which are part of the user model. So add on to this populate
     // And we wanna populate from the user collection, and we want an array of fields that we wanna add, which are gonna be the name and the avatar.
     // then we just wanna do a res.json and we're gonna send along those profiles that we get.
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID     (not profile_id)
// @access   Public
router.get(
  '/user/:user_id',                
  checkObjectId('user_id'),        //check valid userID
  async ({ params: { user_id } }, res) => {
    try {
      const profile = await Profile.findOne({
        user: user_id
      }).populate('user', ['name', 'avatar']);

      if (!profile) return res.status(400).json({ msg: 'Profile not found' });

      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: 'Server error' });
    }
  }
);

// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
// Coz of private, so we have access to the token which we actually have to add in here the auth middleware.
router.delete('/', auth, async (req, res) => {
  try {
    await Promise.all([               //We don't need to get anything. So we don't need a variable here.
      Profile.findOneAndDelete({ user: req.user.id }),    // Remove profile(Pass user, which is the object ID and we can match that to the request user ID.)
      User.findOneAndDelete({ _id: req.user.id })         // Remove user(use underscore ID and match request dot user id. So this will remove the user.)
    ]);

    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/profile/experience        coz u will update it
// @desc     Add profile experience
// @access   Private
router.put(
  '/experience',
  auth,
  check('title', 'Title is required').notEmpty(),
  check('company', 'Company is required').notEmpty(),
  check('from', 'From date is required and needs to be from the past')
    .notEmpty()
    .custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
  async (req, res) => {
    const errors = validationResult(req);               //check for errors, create an errors variable and set that to validation results, pass in requests.
    if (!errors.isEmpty()) {                            //check any errors by saying, if not, errors.isEmpty, then we want to return a response or a status of 400. And let's add in json. & do errors.
      return res.status(400).json({ errors: errors.array() });  // Set that to our errors object, which has a method called array, which will get us that array of errors.
    }

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(req.body);
      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/profile/experience/:exp_id
// @desc     Delete experience from profile
// @access   Private

router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const foundProfile = await Profile.findOne({ user: req.user.id });

    foundProfile.experience = foundProfile.experience.filter(
      (exp) => exp._id.toString() !== req.params.exp_id
    );

    await foundProfile.save();
    return res.status(200).json(foundProfile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
  }
});

// @route    PUT api/profile/education
// @desc     Add profile education
// @access   Private
router.put(
  '/education',
  auth,
  check('school', 'School is required').notEmpty(),
  check('degree', 'Degree is required').notEmpty(),
  check('fieldofstudy', 'Field of study is required').notEmpty(),
  check('from', 'From date is required and needs to be from the past')
    .notEmpty()
    .custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(req.body);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);



//export router
module.exports = router;