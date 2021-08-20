var express = require("express");
var cors = require('cors');
var app = express();
const path = require('path');
var bodyParser = require('body-parser');
var logs = require("./parser.js");


let port = 4000;

app.use(cors());

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use('/scripts', express.static(__dirname + '/node_modules/'))

// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
// app.use(bodyParser.json())

app.get("/", function (req, res, next) {
  //res.sendFile("index.html");
  res.render("index", {logs});
});

app.get('/logs', function (req, res, next) {
  res.json(logs)
});


app.get('/users/:id', function (req, res, next) {
  //let user = users[req.params.id];
  res.json("ok")
});


app.patch('/users/:id', function (req, res,next) {
  console.log("PATCH: ", req.body, req.params);

  users[req.params.id].name = req.body.name;  // update (only for demo)
});


app.listen(port, function () {
  console.log(`CORS-enabled web server listening on port ${port}`)
})