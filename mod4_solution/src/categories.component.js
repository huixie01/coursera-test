(function () {
'use strict';

angular.module('MenuApp')
.controller('CategoriesController', CategoriesController)
.component('categories', {
  templateUrl: 'src/categoriescomponent.template.html',
  bindings: {
    items: '<'
  }
});
CategoriesController.$inject = ['categories']

function CategoriesController(categories) {
 var categoriesCtrl = this;
  categoriesCtrl.categories = categories;
  console.log('Resolved categories:', this.categories);

}

})();
