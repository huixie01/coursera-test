(function(){
'use strict';

angular.module('ShoppingListCheckOff',[])
.controller('ToBuyController', ToBuyController)
.controller('BoughtController', BoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuyList = this;

  toBuyList.items = ShoppingListCheckOffService.getBuyItems();
  toBuyList.removeItem = function (itemIndex) {
    ShoppingListCheckOffService.removeItem(itemIndex);
  }
}


BoughtController.$inject = ['ShoppingListCheckOffService'];
function BoughtController(ShoppingListCheckOffService) {
	var showBoughtList = this;
	showBoughtList.bought = ShoppingListCheckOffService.getBoughtItems();
}


function ShoppingListCheckOffService() {
  var service = this;

  // List of to buy and bought items
  var toBuy = [
	{ name: "cookies", quantity: 6 },
	{ name: "coke", quantity: 3 },
	{ name: "bean", quantity: 5 },
	{ name: "carrot", quantity: 4 },
	{ name: "milk", quantity: 3}
  ];

  var bought = [];

  service.addItem = function (itemIndex) {
    var item = toBuy[itemIndex];
    bought.push(item);
  };

  service.removeItem = function (itemIndex) {
    service.addItem(itemIndex);
	  toBuy.splice(itemIndex, 1);
  };

  service.getBuyItems = function () {
    return toBuy;
  };

  service.getBoughtItems = function () {
    return bought;
  };

}

})();
