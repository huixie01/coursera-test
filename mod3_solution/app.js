(function() {
  'use strict';
  angular.module('NarrowItDownApp',[])
  .controller('NarrowItDownController',NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItemsDirective);

  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'searchResult.html',
      scope: {
        found: '<',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      bindToController: true,
      controllerAs: 'list'

    };
    return ddo;
  }

  function FoundItemsDirectiveController() {
    var list = this;
	list.remove = function(index) {
      list.onRemove({ index: index });
    };
    list.isEmpty = function() {
    return list.found != undefined && list.found.length === 0;
  }
  }
  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var controller = this;
    controller.searchTerm = "";


    controller.searchedList = function() {
      if (controller.searchTerm === "") {
        controller.items = [];
        return;
      }
      var promise = MenuSearchService.getMatchedMenuItems(controller.searchTerm);
      promise.then (function(response) {
        controller.items = response;
      })
      .catch(function(error) {
        console.log("NarrowItDownController response encoutered error", error);
      });
    };

    controller.removeItem = function (itemIndex) {
    		controller.items.splice(itemIndex, 1);
    };
  }
  MenuSearchService.$inject = ['$http'];

    function MenuSearchService($http) {
      var service = this;


	service.getMatchedMenuItems = function (searchTerm) {
			return $http({
				method: 'GET',
				url: 'https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json'
			}).then(function (result){

			var items = result[0].foundItems.menu_items;
        		var foundItems = [];
        		for (var i=0; i<items.length; i++) {
          			console.log(items[i].description);
          			if(items[i].description.toLowerCase().indexOf(searchTerm.toLowerCase()) >=0){
            			foundItems.push(items[i]);
         		 }
        }
        return foundItems;
	});
    };
  }
}
)();
