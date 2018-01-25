var express = require("express");
var app = express();
app.set("view engine", "ejs");
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//To read files
var fs = require('fs');
var userinfo = fs.readFileSync('store1.json');
var infoarray = JSON.parse(userinfo);
console.log(infoarray);

// itemsArray 
var itemsArray = [];






app.use(express.static('views'));

// To be able to implement the css file
app.use(express.static(__dirname + '/views'));



app.get("/", function(req, res){
    res.render("index.ejs",{listOfItems:itemsArray});
});


// adding to the list
app.post('/add',urlencodedParser,function(req, res)
{   
    // accessing data using the name attribute
    if(req.body.item != '') {
        itemsArray.push(req.body.item);
    }
    res.redirect('/');

});





//open a listening port and create a callback function here to get information back in the terminal and verify it's working.
var server = app.listen(3000, listening);

function listening(){
    console.log("listening")
}
