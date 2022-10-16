// index.js
// where your node app starts

// init project

var express = require('express');
var app = express();


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// api get the api
app.get("/api/:word", function(req,res) {
  const dateStr = req.params.word;

  const date = new Date(dateStr);
  console.log(date.toDateString(), date.valueOf()); // 👉️ Wed Jun 22 2022
  
  res.json({
      unix : date.valueOf(),
      utc: date.toGMTString()
    })
});



// listen for requests :)
const listener = app.listen(process.env.PORT || 3001, function () {
  console.log("Node.js listening on port " + listener.address().port);
});


