const express = require('express');  
const router = express.Router();     

// @route     GET api/users
// @desc      Test route
// @access    Public                     @access value whether pub or pvt
router.get('/', (req, res) => res.send('User route'));  //its just a test route
         //for user reg replace'/' to '/register'

//export router
module.exports = router;  

//if do post to api/users, it will create new user
//get help to get the users