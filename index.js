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
  let dateString = req.params.word;

  //A 4 digit number is a valid ISO-8601 for the beginning of that year

  //5 digits or more must be a unix time, until we reach a year 10,000 problem

  if (/\d{5,}/.test(dateString)) {

    const dateInt = parseInt(dateString);

    //Date regards numbers as unix timestamps, strings are processed differently

    res.json({ unix: dateInt, utc: new Date(dateInt).toUTCString() });

  } else {

    let dateObject = new Date(dateString);

    if (dateObject.toString() === "Invalid Date") {

      res.json({ error: "Invalid Date" });

    } else {

      res.json({ unix: dateObject.valueOf(), utc: dateObject.toUTCString() });

    }

  }
});

app.get("/api",function(req,res) {
  const date = new Date()
  console.log(date.valueOf(), date.toUTCString());
  res.json({
    unix: date.valueOf(),
    utc: date.toUTCString()
  })
})



// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Node.js listening on port " + listener.address().port);
});


