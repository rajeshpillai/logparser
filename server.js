const fs = require("fs");
const path = require('path');
var express = require("express");
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
var logs = require("./parser.js");


let port = 4000;

app.use(cors());

app.set('view engine', 'ejs');
// app.set('view options', { layout: 'layout' });

app.use(express.static('public'));
app.use('/scripts', express.static(__dirname + '/node_modules/'))


function readLogFiles(dirname) {
  const result = [];
  console.log("Reading: ", dirname);
  fs.readdirSync(dirname).forEach(function(filename) {
    if (path.extname(filename) === ".json")  {
      result.push(filename);
    }
  });
  return result;
}


let files = [];
app.get("/", function (req, res, next) {
  files = readLogFiles(path.join(__dirname,"data"));
  console.log("FILE NAMES: ", files);
  res.render("index", {files, logs});
});


app.get('/logs', function (req, res, next) {
  res.json(logs)
});



app.get('/logs/:file', function (req, res,next) {
  let file = req.params.file;
  let content = fs.readFileSync(path.join(__dirname,"data",file), 'utf8');
  console.log("GET: ", req.params, content);
  res.json(JSON.parse(content));
});


app.listen(port, function () {
  console.log(`CORS-enabled web server listening on port ${port}`)
})