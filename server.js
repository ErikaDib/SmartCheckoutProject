var express = require("express");
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
        Walmart:walmatItems,WalmartPrices:walmartItemsValue,WalmartTotal:walmartTotalPrice,
        Amazon:amazonItems,AmazonPrices:amazontItemsValue,AmazonTotal:amazonTotalPrice,
        Cosco:coscoItems,CoscoPrices:coscoItemsValue,CoscoTotal:coscoTotalPrice });
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
            walmartItemsValue.push(infoarray[itemsArray[i]]);
            walmartTotalPrice = walmartTotalPrice + parseFloat(infoarray[itemsArray[i]]); 


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
            amazonItems.push(itemsArray[i]);
            amazontItemsValue.push(amazonArray[itemsArray[i]]);
            amazonTotalPrice = amazonTotalPrice + parseFloat(amazonArray[itemsArray[i]]);            
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
    
    res.redirect('/');       
  

});


//open a listening port and create a callback function here to get information back in the terminal and verify it's working.
var server = app.listen(3000, listening);

function listening(){
    console.log("listening")
}
