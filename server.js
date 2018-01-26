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
var coscoArray = JSON.parse(coscoInfo);


var weatherData = "";

app.use(express.static('views'));

// to get value from the input
var moneySaveArray = [];

var moneySaveWalmart = 0;
var moneySaveAmazon = 0;
var moneySaveCosco = 0;




// itemsArray added from the user form
var itemsArray = [];

//walmart Array of Item when to populate the walmart div
var walmatItems = [];
var walmartItemsValue = [];
var walmartTotalPrice = 0;
//amazon Array of Item when to populate the amazon div

var amazonItems = [];
var amazontItemsValue = [];
var amazonTotalPrice = 0;

//cosco Array of Item when to populate the cosco div
var coscoItems = [];
var coscoItemsValue = [];
var coscoTotalPrice = 0;

app.use(express.static('views'));
// To be able to implement the css file
app.use(express.static(__dirname + '/views'));
app.get("/", function(req, res){
    res.render("index.ejs",
    {listOfItems:itemsArray,

        Walmart:walmatItems,WalmartPrices:walmartItemsValue,WalmartTotal:walmartTotalPrice,sWalmart:moneySaveWalmart,
        Amazon:amazonItems,AmazonPrices:amazontItemsValue,AmazonTotal:amazonTotalPrice,sAmazon:moneySaveAmazon,
        Cosco:coscoItems,CoscoPrices:coscoItemsValue,CoscoTotal:coscoTotalPrice,sCosco:moneySaveCosco, weatherData:weatherData});

});
// adding to the list
app.post('/add',urlencodedParser,function(req, res)
{
    // accessing data using the name attribute
    if(req.body.item != '') {
        itemsArray.push(req.body.item);
    }

    // console.log("print budget mielda " + req.body.budget);
    // saving variable money from stores
    // checking if budget input is empthy
    if(req.body.budget != '')
    {    
        if(moneySaveArray.length <= 0)
        {
            moneySaveArray.push(req.body.budget);
        }
        // checking if it is not the same swipe 
        else if(moneySaveArray[0] != req.body.budget )
        {
            moneySaveArray[0] = req.body.budget;
        }
       
    }    
     console.log("moneySaveArray is  " + moneySaveArray);

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
            walmartItemsValue.push(infoarray[itemsArray[i]]);

            walmartTotalPrice = walmartTotalPrice + parseFloat(infoarray[itemsArray[i]]); 

         }  

         else
         {
            console.log("object not found.Get foodstand");
         }
    }
    // money saved on the walmart store
    moneySaveWalmart = parseFloat(moneySaveArray[0])  - walmartTotalPrice;
    console.log("money saved from walmart " + moneySaveWalmart);

    
     // console.log("value for savings " + moneySaveWalmart);
     // console.log("req.body.budget with parse" + parseFloat(req.body.budget));
     // console.log("req.body.budget with without parse" + req.body.budget);
     // console.log("value of total price" + walmartTotalPrice);
     // console.log("money saved array" + moneySaveArray[0]);


    // amazon
    for(var i = 0; i < itemsArray.length; i++)
    {
         if(amazonArray.hasOwnProperty(itemsArray[i]))
         {
            console.log("item found " + itemsArray[i]);
            amazonItems.push(itemsArray[i]);//add the
            amazontItemsValue.push(amazonArray[itemsArray[i]]);
            amazonTotalPrice = amazonTotalPrice + parseFloat(amazonArray[itemsArray[i]]);
         }
         else
         {
            console.log("object not found.Get foodstand");
         }
    }
    moneySaveAmazon = parseFloat(moneySaveArray[0])  - amazonTotalPrice;
    console.log("money saved from amazon" + moneySaveAmazon);

    // cosco
     for(var i = 0; i < itemsArray.length; i++)
    {
         if(coscoArray.hasOwnProperty(itemsArray[i]))
         {
            console.log("item found " + itemsArray[i]);
            coscoItems.push(itemsArray[i]);
            coscoItemsValue.push(coscoArray[itemsArray[i]]);
            coscoTotalPrice = coscoTotalPrice + parseFloat(coscoArray[itemsArray[i]]);
            // console.log(coscoArray[itemsArray[i]]);
         }
         else
         {
            console.log("object not found.Get foodstand");
         }
    }

    moneySaveCosco = parseFloat(moneySaveArray[0])  - coscoTotalPrice;
    console.log("money saved from Cosco" + moneySaveCosco);
    itemsArray = [];//reseting the list for the user
    res.redirect('/');       
  




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
