
console.log("server is starting");

var express = require('express');

//making our app
var app = express();
var server = app.listen(8080,listenning);

function listenning()
{
	console.log("listening");
}


app.use(express.static(__dirname + '/views'));
app.get('/', function(req, res) {
  // do something here.
    res.render("index.ejs");

});

