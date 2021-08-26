const fs = require("fs");
const path = require('path');
var express = require("express");
var cors = require('cors');
const multer = require("multer");
var app = express();
var bodyParser = require('body-parser');
var logs = require("./parser.js");

const parseLog = require("./parser.js");

let port = 4000;

app.use(cors());

app.set('view engine', 'ejs');
// app.set('view options', { layout: 'layout' });

app.use(express.static(__dirname + '/public'));
app.use('/scripts', express.static(__dirname + '/node_modules/'))


function readLogFiles(dirname) {
  const result = [];
  fs.readdirSync(dirname).forEach(function(filename) {
    if (path.extname(filename) === ".json")  {
      result.push(filename);
    }
  });
  return result;
}


let files = [];


const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'data/');
  },
 
  filename: function(req, file, cb) {
      cb(null, file.originalname + '-' + Date.now() + path.extname(file.originalname));
  }
});
 
var upload = multer({ storage: storage })
 
 
app.post('/uploads', upload.array('multi-files'), (req, res) => {  
  res.redirect('/');
});


// AJAX
app.get('/logs/:file', function (req, res,next) {
  var isAjax = (req.xhr || req.headers.accept.indexOf('json') > -1 || req.headers["content-type"] == 'application/json') ? true : false;
  files = readLogFiles(path.join(__dirname,"data"));

  let file = req.params.file;
  
  let content = undefined;
  try {
    content = fs.readFileSync(path.join(__dirname,"data",file), 'utf8');
  } catch(e) {
    landing(res);
    return;
  }
  
  logs = parseLog(JSON.parse(content));
  
  if (isAjax) return res.json(logs);
  res.render("index", {files, logs: logs.items});
});


// app.get('/logs', function (req, res, next) {
//   res.json(logs)
// });

app.get("*", function (req, res, next) {
  landing(res);
});

function landing(res) {
  files = readLogFiles(path.join(__dirname,"data"));
  res.render("index", {files, logs: []});
}


app.listen(port, function () {
  console.log(`CORS-enabled web server listening on port ${port}`)
})