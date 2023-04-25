var cors = require("cors");
var express = require('express')
var app = express()

app.use(cors);

app.get('/', function (req, res) {
    res.send('hello world')
  })

app.listen(3000);