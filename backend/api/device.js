const express = require('express');
const router = express.Router();


router.route('/')
.all(function(req,res,next){
    next();
})
.get(function (req, res){


})

module.exports = router;