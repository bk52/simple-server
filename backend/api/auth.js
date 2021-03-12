const express = require('express');
const router = express.Router();

router.route('/')
.all(function(req,res,next){
    next();
})
.post(function (req, res) {
  const {username, password} = req.body;
  if(username && password && username!=="" && password !=="")
  {
    if(username === process.env.SRV_USER && password===process.env.SRV_PASS)
    {
        res.status(200).json({ token: "abc" });
    }
    else{
        res.status(400).json({ message: "Invalid username or password" });
    }
  }
  else{
    res.status(400).json({ message: "Bad Request" });
  }

})

module.exports = router;