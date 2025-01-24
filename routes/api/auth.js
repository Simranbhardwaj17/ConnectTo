const express = require('express');  // bring exp
const router = express.Router(); //to use exp router, create a var called router & set to express.Router();
const auth = require('../../middleware/auth')            //bring middleware, outside of api. routes into middleware then auth

const User = require('../../models/User');
//create route(don't do app.get/post.)
//We do router.get('/', callbk) req        for callbk use arr fn with req res
// @route     GET api/auth
// @desc      Test route(reg users,..)
// @access    Public                     @access value whether pub or pvt
//to use middleware, add as 2nd parameter
router.get('/', auth, async (req, res) => {
    // do a try-catch to make a call to our database using async/await
    try {            
        const user = await User.findById(req.user.id).select('-password');             //.select('-password'):- leave off the passw in the data(not ret passw)
        res.json(user);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});  //only adding middleware(auth) make this route protected.

//export router
module.exports = router; 