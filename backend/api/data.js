const express = require('express');
const router = express.Router();
const dataModel= require("../db/models/data");

router.route('/')
.all(function(req,res,next){
    next();
})
.post(function (req, res) {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const {appKey, payload} = req.body;
  console.log("IP -> " + ip);
  console.log("appKey -> " + appKey);
  console.log("payload -> " + JSON.stringify(payload));
  dataModel.insertData({ip,appKey,payload})
  .then((res)=>{res.status(200).json({"message":"successful"})})
  .catch((err)=>{res.status(500).json({"message":JSON.stringify(err)})})
})

module.exports = router;