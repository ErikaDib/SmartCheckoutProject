var express = require("express");
var request = require("request");
var app = express();
app.set("view engine", "ejs");
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//To read files
var fs = require('fs');
var userinfo = fs.readFileSync('userInfo.json');
var infoarray = JSON.parse(userinfo);
console.log(infoarray);


app.use(express.static('views'));

// To be able to implement the css file
app.use(express.static(__dirname + '/public'));



app.get("/", function(req, res){
   // res.render("search");
});





//open a listening port and create a callback function here to get information back in the terminal and verify it's working.
var server = app.listen(3000, listening);

function listening(){
    console.log("listening")
}
