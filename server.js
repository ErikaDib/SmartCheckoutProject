var express = require("express");
var app = express();
app.set("view engine", "ejs");
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//To read files
var fs = require('fs');
var storeInfo = fs.readFileSync('DummyData/Associates.json'); //return not a javaS object
var infoarray = JSON.parse(storeInfo);
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
    console.log("arrayList is  " + itemsArray);

    res.redirect('/');

});

// adding to the list
app.get('/delete/:id',urlencodedParser,function(req, res)
{      
    if (req.params.id != '') {
        console.log("id for the element " +req.params.id );
        itemsArray.splice(req.params.id, 1);
        console.log("it gets to here");

    }
    res.redirect('/');       

});


app.get('/checkout',urlencodedParser,function(req, res)
{ 
    
    for(var i = 0; i < itemsArray.length; i++)
    {
         if(infoarray.hasOwnProperty(itemsArray[i]))
         {
            console.log("item found " + itemsArray[i]);
         }
         else
         {
            console.log("object not found.Get foodstand");
         }  

    }











    console.log("checkout route triggered");
    res.redirect('/');       

});





//open a listening port and create a callback function here to get information back in the terminal and verify it's working.
var server = app.listen(3000, listening);

function listening(){
    console.log("listening")
}
