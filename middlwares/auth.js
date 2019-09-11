const config = require("config");
const jwt = require('jsonwebtoken');

auth = function (req, res , next ){
     const token = req.header('x-auth-token');
     if(!token) return res.status(401).send('Access denied. No token provided ')
     
     try{
         const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
         req.user = decoded;
         console.log(decoded)
         next();
     } catch (ex) {
         res.status(400).send('invalid token');
     }
}

authorization = function(req, res, next){
    const token = req.header("x-auth-token");
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded;
       if(decoded.role == "Admin") {
           res.status().send("Authorized")
           next()
       }
       else{
           res.send("Not authorized")
           next()
       }
        next();
    
}

module.exports = {auth, authorization};