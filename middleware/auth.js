const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    //Get token from header
    const token = req.header('x-auth-token');                      //when send a req to a protected route, send token with header

    const jwtSecret = process.env.JWT_SECRET; 

    //check if no token
    if (!token) {       
        return res.status(401).json({ msg: 'No token, authorization denied'});  // if there's no token, then we're gonna return a response, a status, and the status is gonna be 401 which is not authorized & the msg
    }

    //verify token
    try { 
        const decoded = jwt.verify(token, jwtSecret);      //decode the token
        req.user = decoded.user;                           //take the request object and assign a value to user, assigned decoded val
        next();

    } catch (err) {
        res.status(401).json({ msg:'Token is not valid'});        
    }
    // if (!token) {
    //     return res.status(400).json({ error: 'Token is required' });
    //   }
    
      // try {
      //   const decoded = jwt.verify(token, jwtSecret); // Verify the token
      //   res.json({ message: 'Token is valid', decoded });
      // } catch (err) {
      //   console.error('Verification Error:', err.message);
      //   res.status(401).json({ error: 'Invalid or expired token' });
      // }
}
