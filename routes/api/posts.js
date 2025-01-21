const express = require('express');  // bring exp
const router = express.Router(); //to use exp router, create a var called router & set to express.Router();

// @route     GET api/posts
// @desc      Test route
// @access    Public                     @access value whether pub or pvt
router.get('/', (req, res) => res.send('Posts route'));  //its just a test route

//export router
module.exports = router;  