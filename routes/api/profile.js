const express = require('express');  
const router = express.Router(); 
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

//We do router.get('/', callbk) req        for callbk use arr fn with req res
// @route     GET api/profile/me           api/profile is for all pfp
// @desc      Get current users profile
// @access    Private            coz we r getting the profile by user id that's in the token. so they have to send a token, which means we need to bring in the auth middleware and add that.
// add auth as a second parameter. So, whatever routes we want to protect, that's all we have to do is add that as a second parameter.
router.get('/me', auth, async (req, res) => {
    try{
        //create a variable called profile, and set that to await, because we're going to call our model method
        //call dot findOne, because we're only finding one, and we want to find it by the user,we have access to request dot user & we want to get it by the id.
        //use a mthd cld populate, to pop.. this with the name of the user and the avatar.
        const profile = await Profile.findOne({ user: req.user.id}).populate('user', ['name', 'avatar']);  

        if(!profile) {
            return res.status(400).json({msg: 'There is no profile for this user'});
        }
        res.json(profile);

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});  

//export router
module.exports = router;  