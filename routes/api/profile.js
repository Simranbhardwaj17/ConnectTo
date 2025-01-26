const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
// bring in normalize to give us a proper url, regardless of what user entered
const normalize = require('normalize-url');
// import normalizeUrl from 'normalize-url';     //for new-version, use import

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
      const profiles = await Profile.find().populate('user', ['name', 'avatar']);
      res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//export router
module.exports = router;