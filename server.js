var express = require("express");
var weather = require('weather-js');
var app = express();
app.set("view engine", "ejs");
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//To read files
var fs = require('fs');

// walmart items
var storeInfo = fs.readFileSync('DummyData/walmart.json'); //return not a javaS object
var infoarray = JSON.parse(storeInfo);


// amazon items
var amazonInfo = fs.readFileSync('DummyData/amazon.json'); //return not a javaS object
var amazonArray = JSON.parse(amazonInfo);


var coscoInfo = fs.readFileSync('DummyData/cosco.json'); //return not a javaS object
var coscoArray = JSON.parse(amazonInfo);


var weatherData = "";





// itemsArray added from the user form
var itemsArray = [];
//walmart Array of Item when to populate the walmart div
var walmatItems = [];
//amazon Array of Item when to populate the amazon div
var amazonArray = [];


//cosco Array of Item when to populate the cosco div
var coscoArray = [];



app.use(express.static('views'));
// To be able to implement the css file
app.use(express.static(__dirname + '/views'));

app.get("/", function(req, res){
    res.render("index.ejs",{listOfItems:itemsArray,Walmart:walmatItems,Amazon:amazonArray,Cosco:coscoArray,weatherData:weatherData});
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
    // walmart
    console.log("checkOut triggered");
    for(var i = 0; i < itemsArray.length; i++)
    {
         if(infoarray.hasOwnProperty(itemsArray[i]))
         {
            console.log("item found " + itemsArray[i]);
            walmatItems.push(itemsArray[i]);
         }
         else
         {
            console.log("object not found.Get foodstand");
         }

    }
    // amazon
    for(var i = 0; i < itemsArray.length; i++)
    {
         if(infoarray.hasOwnProperty(itemsArray[i]))
         {
            console.log("item found " + itemsArray[i]);
            amazonArray.push(itemsArray[i]);
         }
         else
         {
            console.log("object not found.Get foodstand");
         }

    }
    // cosco
     for(var i = 0; i < itemsArray.length; i++)
    {
         if(infoarray.hasOwnProperty(itemsArray[i]))
         {
            console.log("item found " + itemsArray[i]);
            coscoArray.push(itemsArray[i]);
         }
         else
         {
            console.log("object not found.Get foodstand");
         }

    }



    res.redirect('/');


});

// Juan's Part (WEATHER SECTION) ++++++++
weather.find({search: 'Bronx, NY', degreeType: 'F'}, function(err, result) {
  if(err) console.log(err);

  weatherData = {
      location:result[0]["location"]["name"],
      temp: result[0]["current"]["temperature"],
      feels: result[0]["current"]["feelslike"],
      image: result[0]["current"]["imageUrl"],
      weekDay: result[0]["current"]["day"]
  };
});


//open a listening port and create a callback function here to get information back in the terminal and verify it's working.
var server = app.listen(3000, listening);

function listening(){
    console.log("listening")
}
