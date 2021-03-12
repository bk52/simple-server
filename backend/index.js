const express = require("express");
const cors = require("cors");
const path = require('path');
const bodyParser = require("body-parser");
const mongoSanitize = require("express-mongo-sanitize");
const dotenv = require('dotenv');
const cLog = require("./common/logger");
dotenv.config();
global.log = cLog.Log;
const PORT = process.env.PORT || 6000
const db= require("./db")
const dataRouter = require("./api/data");
const authRouter = require("./api/auth");

db.Connect();

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(mongoSanitize({ replaceWith: "_" }));
app.use('/', express.static('publish'))
app.use("/api/data", dataRouter);
app.use("/api/auth", authRouter);
app.listen(PORT, () => global.log("Server Ready On port " + PORT,__filename,"s"));
