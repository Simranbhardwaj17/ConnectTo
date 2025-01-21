const express = require('express');  // bring exp
const router = express.Router(); //to use exp router, create a var called router & set to express.Router();

//create route(don't do app.get/post.)
//We do router.get('/', callbk) req        for callbk use arr fn with req res
// @route     GET api/auth
// @desc      Test route(reg users,..)
// @access    Public                     @access value whether pub or pvt
router.get('/', (req, res) => res.send('Auth route'));  //its just a test route

//export router
module.exports = router;  