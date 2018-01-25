
//         +++++ STOREITEMSLIST CLASS +++++
function StoreItemList(storeName){
    var name = storeName;
    var total = 0;
    var ItemList = [];

    this.addItem = function(name, price){
        var item =
        {
            "name" : name,
            "price": price
        };

        this.ItemList.push(item);
        this.total += price;
    };

    this.getTotal = function(){
        return this.total;
    };
}
