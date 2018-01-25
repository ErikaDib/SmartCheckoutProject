
//         +++++ GROCCERYLIST CLASS +++++
function GrocceryList()
{
    this.grocceryItems = [];
    this.numItems = 0;

    // creates an Item object to insert to grocceryItems
    // array.
    //*BUG* same item twice *BUG*
    this.addItem = function(name, price){
        var item = {
            "name" : name,
            "price": price
        };
        this.grocceryItems.push(item);
        this.numItems++;
    };

    // search an item by name and removes first occurrence
    // of that item from grocceryItems array
    this.removeItem = function(name){
        var index = -1;
        for(var i=0; i<this.numItems; i++)
            if(name == this.grocceryItems[i]["name"])
                index = i;

        this.grocceryItems.splice(index, 1);
        this.numItems--;
    };

    // returns a copy of the array of items
    this.getAllItems = function(){
        return this.grocceryItems.slice();
    };
}
