const express = require('express');  
const router = express.Router(); 
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables
const { check, validationResult } = require('express-validator');
//check,.. comes from  ..        read doc exp-validator

const User = require('../../models/User');        //gonna up two levels into models

// @route     POST api/users
// @desc      Register user
// @access    Public                     @access value whether pub or pvt
router.post(
    '/',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Please enter a password with 6 or more characters').isLength({min: 6})
    ],
    async (req, res) => {
        // console.log(req.body);   //req.body: that's the obj of data sent to this route, in order for this to work,initialize middlewres for body parser
       const errors = validationResult(req);
       if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
       }

       const { name, email, password } = req.body;

       try {
        //See if user exists(send error, can't send multipe emails for same)      findOne:takes a field that u wanted to search by 
        let user = await User.findOne({email});

        if (user) {
            return res.status(400).json({ errors: [{ msg: ' User alredy exists'}] });  //we want to match the above err(i/p err) with existing user
        }
        //Get user gravator url
        const avatar = gravatar.url(email, {
            s: '200',            //default size, string:200
            r: 'pg',             //can't have any naked ppl or anything
            d: 'mm'              //def img like a user icon(need something there even if the user doesn't have gravatar)
        })

        //create instance of user & pass in an obj with fields we want
        user = new User({      //call user.save to save it to B
            name, 
            email,
            avatar,
            password
        });

        //Encrypt passw
        const salt = await bcrypt.genSalt(10);                  //create a var cld salt to do hashing width   
        
        //create hash(hash the passw)
        user.password = await bcrypt.hash(password, salt);      //bcrypt.hash(): it takes plain text passw, 7 salt

        await user.save();    //this give promise(user get saved to DB)

        //Return jsonwebtoken  coz in FE, when a user reg, want them to logged in ri8 away,so u need that token

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

//if do post to api/users, it will create new user
//GET help to get the users
//now we wanna be able to send data to this route, need to send name,passw in the email to reg a user
//u used to have to i body parser as a pkg, but now its included with exp
