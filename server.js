var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");

app.get("/", function(req, res){
   // res.render("search");
});

app.get("/results", function(req, res){
    var query = req.query.search;
    var url = "http://omdbapi.com/?s=" + query;
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200) {
            // var data = JSON.parse(body)
            // res.render("results", {data: data});
        }
    });
});



//open a listening port and create a callback function here to get information back in the terminal and verify it's working.
var server = app.listen(3000, listening);

function listening(){
    console.log("listening")
}
