
(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemDetailsController', ItemDetailsController)
.component('itemdetails', {
  templateUrl: 'src/itemdetailscomponent.template.html',
  bindings: {    
	itemDetails: '<'
  }
});

// 'item' is injected through state's resolve
ItemDetailsController.$inject = []
function ItemDetailsController(itemDetails) {
  var ctrl = this;
  var category_item_details = itemDetails;
  console.log(category_item_details);
}

})();
