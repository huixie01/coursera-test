
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
ItemDetailsController.$inject = ['itemDetails']
function ItemDetailsController(itemDetails) {
  var ctrl = this;
  ctrl.category_item_details = itemDetails;
  console.log(category_item_details);
}

})();
