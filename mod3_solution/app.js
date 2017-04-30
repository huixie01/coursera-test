(function() {
  'use strict';
  angular.module('NarrowItDownApp',[])
  .controller('NarrowItDownController',NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItemsDirective)
  .constant('RestApiUrl', "https://davids-restaurant.herokuapp.com");

  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'searchResult.html',
      scope : {
        found: '<',
        onRemove: '&',
        empty: '<'
      },
      controller: FoundItemsDirectiveController,
      bindToController: true,
      controllerAs: 'myCtrl',

    };
    return ddo;
  }

  function FoundItemsDirectiveController() {
    var list = this;
    list.isEmpty = function() {
    return list.found != undefined && list.found.length === 0;
  }
  }
  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(NarrowItDownService) {
    var controller = this;
    controller.searchTerm = "";


    controller.searchedList = function() {
      if (controller.searchTerm === "") {
        controller.items = [];
        return;
      }
      var promise = MenuSearchService.getMatchedMenuItems(controller.searchTerm);
      promis.then (function(response) {
        controller.items = response;
      })
      .catch(function(error) {
        console.log("NarrowItDownController response encoutered error", error);
      });
    };

    controller.removeItem = function (itemIndex) {
    		foundItems.splice(itemIndex, 1);
    };
  }

    function MenuSearchService($http, RestApiUrl) {
      var service = this;


		  service.getMatchedMenuItems = function (searchTerm) {
			return $http({
				method: "GET",
				url: (ApiBasePath + "/menu_items.json")
			}).then(function (result){

				var items = result.data.menu_items;
        var foundItems = [];
        for (var i=0; i<items.length; i++) {
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
