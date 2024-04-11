const asynchandler = require("express-async-handler")
const jwt = require("jsonwebtoken")

const validateToken = asynchandler( async (req, res, next) => {
    let token;
    let authHeader  = req.headers.authorization || req.headers.Authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
       token = authHeader.split(" ")[1];
       if(!token){
        res.status(400);
        throw new Error("Token doesn't exist")
       }
       try{
         const decoded = jwt.verify(token, process.env.SECRET_KEY)
         req.user = decoded.user;
         next()
       }catch(err){
        res.status(400)
        throw new Error("user is not authenticated!")
       }

    }else{
        res.status(400)
        throw new Error("auth token doesn't exist or is invalid")
    }
})

module.exports = validateToken;