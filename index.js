var path = require("path");
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
const port=9200;

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => console.log("Server Ready On port " + port));
