const jwt = require("jsonwebtoken");
const authCache=require("../cache/auth");

function verify(req,res,next){
    try{
        let token=req.headers['authorization'].split(' ')[1];
        if(token && token!==""){
            let payload= jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            next();
        }
        else{
            res.status(401).json({"message":"Invalid token"});
        }      
    }
    catch(e){
        global.log(e,__filename,'e',"verifyUser");
        res.status(401).json({"message":"Invalid token"});
    }
  
}

module.exports=verify;