(function() {
'use strict';

angular.module('data')
  .service('MenuDataService', MenuDataService);

MenuDataService.$inject = ['$http']
function MenuDataService($http) {
  var service = this;

  this.getAllCategories = function() {
    return $http({
      method: 'GET',
      url: 'https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json'
    });
  }

  this.getItemsForCategory = function(categoryShortName) {
    return $http({
      method: 'GET',
      url: 'https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json?category='+categoryShortName
    });
  }
  this.getItemDetailsForCategoryItem = function(categoryShortName, itemId) {
    return $http({
      method: 'GET',
      url: 'https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json?category='+categoryShortName+'&itemId='+itemId
    });
  }
}
})();
