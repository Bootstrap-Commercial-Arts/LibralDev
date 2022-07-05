var express = require('express');
var fs = require('fs');
var app = express();
var cors = require('cors');
app.use(cors());


var path = require('path');

// All other routes should redirect to the index.html
  app.route('/')
    .get(function(req, res) {
        res.sendFile(__dirname + '/static/index.html');
    });

//static assets    
app.use(express.static('static'));


// Start server
app.listen(3333, console.log('server running on port 3333'));