
(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemDetailsController', ItemDetailsController)
.component('itemdetails', {
  templateUrl: 'src/itemdetailscomponent.template.html',
  bindings: {
    itemdetails: '<'
  }
});

// 'item' is injected through state's resolve
ItemDetailsController.$inject = ['itemdetails']
function ItemdDetailssController(itemdetails) {
  var itemDetailsCtrl = this;
  this.menu_item_details = itemdetails;
}

})();
