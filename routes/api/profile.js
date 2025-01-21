const express = require('express');  
const router = express.Router(); 

//create route(don't do app.get/post.)
//We do router.get('/', callbk) req        for callbk use arr fn with req res
// @route     GET api/profile
// @desc      Test route
// @access    Public                     @access value whether pub or pvt
router.get('/', (req, res) => res.send('Profile route'));  //its just a test route

//export router
module.exports = router;  