const express = require('express');                      // bring exp
const router = express.Router();                         //to use exp router, create a var called router & set to express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth')            //bring middleware, outside of api. routes into middleware then auth
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');

//We do router.get('/', callbk) req        for callbk use arr fn with req res
// @route     GET api/auth
// @desc      Test route(reg users,..)
// @access    Public                     @access value whether pub or pvt
//to use middleware, add as 2nd parameter
//only adding middleware(auth) make this route protected.
router.get('/', auth, async (req, res) => {
    // do a try-catch to make a call to our database using async/await
    try {            
        const user = await User.findById(req.user.id).select('-password');         //.select('-password'):- leave off the passw in the data(not ret passw)
        res.json(user);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});  
                        
//This entire route is to authenticate/validate a user(a way to just to be able to login with users that are already in the database.)
// @route     POST api/auth
// @desc      Authenticate user & get token
// @access    Public              (public, obviously, because the purpose of this route is to get the token so that you can make requests to private routes.)
router.post(
    '/',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists()
    ],
    async (req, res) => {
        // console.log(req.body);   //req.body: that's the obj of data sent to this route, in order for this to work,initialize middlewres for body parser
       const errors = validationResult(req);
       if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
       }

       const { email, password } = req.body;

       try {
        //See if user exists(send error, can't send multipe emails for same)      findOne:takes a field that u wanted to search by 
        let user = await User.findOne({email});

        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials'}] });  //we want to match the above err(i/p err) with existing user
        }
        // user that's found we need to make sure that the password matches.bcrypt has a method called compare, which takes a plain text password and a encrypted password and compares them and tells you if it's a match or not.
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).json({errors: [{ msg: 'Invalid credentials' }] });
        }

        //create payload
        const payload = {
            user: {
                id: user.id     //mongoose use abstraction (.id as obj)
            }
        };

        const jwtSecret = process.env.JWT_SECRET;        

        jwt.sign(         //pass payL, secret, expiration, inside callbk we will get either err or token
            payload, 
            jwtSecret, 
            { expiresIn: 36000},
            (err, token) => {
                if(err) throw err;
                res.json({ token });
            });
        } catch(err) {
        console.log(err.message);
        res.status(500).send('Server error');
       }
    }
);  

//export router
module.exports = router; 