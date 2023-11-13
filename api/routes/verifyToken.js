const jwt = require("jsonwebtoken")

 const verifyToken = (req,res, next) =>{
    const authHeader = req.headers.token
    if(authHeader){
const token = authHeader.split(" ")[1]
jwt.verify(token, process.env.KEY, (err, user) =>{
    if(err){res.json("Error")}
    req.user = user
    next()
})

    }else{res.json("You are not authenticated!");}
}

 const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.id === req.params.id || req.user.isAdmin ){
            next()
        }else{res.json("Error")}
    })
}
 const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.isAdmin){
            next()
        }else{res.json("Error")}
    })
}
  
module.exports = {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
  };  
  

