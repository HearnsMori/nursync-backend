//store token in req header Authorization
//store refresh token in req header refreshAuth
//req userId stores the username of the user
//req newToken if token expired and the refresh token are used
//req userId set to false if invalid token or if both token and refresh token are expired
const jwt = require('jsonwebtoken');
verifyToken = async (req, res, next) => {
   const token = req.header('Authorization');
   const refreshToken = req.header('refreshAuth');
   if (!token) {
      req.userId = false;
      next();
   } else {
      if(token.exp <= Date.now()/1000) {
         //if token expired
         try {
            const decoded = jwt.verify(refreshToken, process.env.SECRETKEY);
            const findUser = decoded.userId;
            const token = jwt.sign({userId: findUser.username}, process.env.SECRETKEY, {expiresIn: '1h'});
            req.userId = decoded.userId;
            req.newToken = token;
            next();
         } catch (err) {
            req.userId = false;
            next();
         }
      } else {
         try {
            const decoded = jwt.verify(token, process.env.SECRETKEY);
            req.userId = decoded.userId;
            next();
         } catch (err) {
            req.userId = false;
            next();
         }
      }
   }
}

module.exports = verifyToken;
