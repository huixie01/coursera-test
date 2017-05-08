(function () {
'use strict';

angular.module('Data')
.service('MenuDataService',MenuDataService);

MenuDataService.$inject = ['$http']

function MenuDataService($http) {
    var service = this;

    this.getAllCategories = function() {
      return $http({
          method: 'GET',
          url: 'https://davids-restaurant.herokuapp.com/categories.json'
        });
    }
    this.getItemsforCategory = function(categoryShortName){
          return $http({
              method: 'GET',
              url: 'https://davids-restaurant.herokuapp.com/menu_items.json',
              params: {category: categoryShortName}
          });

    }

}
})();
