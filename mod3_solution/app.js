(function() {
  'use strict';
  angular.module('NarrowItDownApp',[])
  .controller('NarrowItDownController',NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItemsDirective);

  function FoundItemsDirectiveController() {
    var list = this;
	
    list.isEmpty = function() {
    return list.found != undefined && list.found.length === 0;
  	}
  } // end of FoundItemsDirectiveController
	
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
  } //end of directive function

	MenuSearchService.$inject = ['$http'];

    function MenuSearchService($http) {
    var service = this;
	service.getMatchedMenuItems = function (searchTerm) {
			return $http({
				method: 'GET',
				url: 'https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json'
			}).then(function (response){
			var rawData = response.data;
			var allItems = [];
			angular.forEach(rawData, function(value,key) {
				console.log("key=",key);
				if (value.menu_items) {
					allItems = ctrl.foundItems.concat(value.menu_items);
				}
			});
			// Filter items by searchTerm
			var term = searchTerm.toLowerCase();
			var matchedItems = allItems.filter(function(item) {
	    			return item.name.toLowerCase().includes(term);
	  		});
			return matchedItems;
			}); //end of then
	
    }; //end of getMatchedMenuItems
  }  // end of getMatchedService
 


	
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
		return controller.items;
    }; // end of searchedList

    controller.removeItem = function (itemIndex) {
    		controller.items.splice(itemIndex, 1);
    };
  } // end of function NarrowIDOwnCOntroller
 NarrowItDownController.$inject = ['MenuSearchService'];
  

)();
