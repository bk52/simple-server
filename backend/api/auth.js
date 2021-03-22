const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const authCache = require("../cache/auth");

router.route('/')
  .all(function (req, res, next) {
    next();
  })
  .post(function (req, res) {
    const { username, password } = req.body;
    if (username && password && username !== "" && password !== "") {
      if (username === process.env.SRV_USER && password === process.env.SRV_PASS) {
        let payload = {
        }
        let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: parseInt(process.env.ACCESS_TOKEN_LIFE)
        })
        let refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: parseInt(process.env.REFRESH_TOKEN_LIFE)
        })
        //authCache.setUser({ id: _user._id.toString(),accessToken: accessToken });
        res.status(200).json({
          "accessToken": accessToken,
          "refreshToken": refreshToken
        })
      }
      else {
        res.status(400).json({ message: "Invalid username or password" });
      }
    }
    else {
      res.status(400).json({ message: "Bad Request" });
    }

  })

module.exports = router;