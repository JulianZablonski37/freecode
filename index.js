// index.js
// where your node app starts

// init project

var navigator= require('navigator');
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


app.get('/api/',function(req,res){
  const current = new Date();
  return res.json({
    unix: current.getTime(),
    utc: current.toUTCString(),
  });
})

app.get('/api/whoami',function(req,res){
  let agent = navigator.userAgent;
  fetch('https://api.ipify.org?format=json')
  .then(response => response.json())
  .then(data => res.json({
    ipaddress: data.ip ,
    language:req.headers['accept-language'],
    software:agent,
  }));
  
})

app.get("/api/:date",function(req,res){

  const date = new Date(req.params.date);
  if (date.toString() === 'Invalid Date') {
    const date2 = new Date(parseInt(req.params.date, 10));
    if (date2.toString() === 'Invalid Date') {
      return res.json({ error : "Invalid Date" });
    }
    return res.json({
      unix: date2.getTime(),
      utc: date2.toUTCString(),
    }); 
  }
    return res.json({
      unix: date.getTime(),
      utc: date.toUTCString(),
    });
})


//Listen on port set in environment variable or default to 3000
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Node.js listening on port " + listener.address().port);
});
