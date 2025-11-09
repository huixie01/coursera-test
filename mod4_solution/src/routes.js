(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/home.template.html'
  })

  // Categories page
  .state('categories', {
    url: '/categories',
    templateUrl: 'src/categories.template.html',
    controller: 'CategoriesController as categoriesCtrl',
    resolve: {
      categories: ['MenuDataService', function(MenuDataService) {
        return MenuDataService.getAllCategories().then(function(response) {
	//console.log(response.data);
         // return response.data;
	return Object.values(response.data).map(c => c.category);
        });
      }]
    }
  })

  // Items page
  .state('items', {
    url: '/categories/:category',
    templateUrl: 'src/items.template.html',
    controller: 'ItemsController as itemsCtrl',
    //component: 'items',
    resolve: {
      items: ['MenuDataService', '$stateParams', function(MenuDataService, $stateParams) {
	console.log("In Items, stateParams:"+$stateParams.category);
        return MenuDataService.getItemsForCategory($stateParams.category).then(function(response) {
  	  console.log('Raw response', response);
	 	 // const categoryJsonData = JSON.parse(categoryJsonStr);
	  	var categoryshortName = response.data.category.short_name;
		console.log(categoryshortName); // Output: "B"
	
	 	                   
          return categoryshortName? response.data.menu_items.map(item => ({...item, category:categoryshortName})) : [];				
        });
      }]
    }
  })

  .state('itemDetails', {
  url: '/categories/:category/:itemId',
  templateUrl: 'src/itemdetailscomponent.template.html',
  controller: 'ItemDetailsController as itemDetailsCtrl',
  resolve: {

/*
    itemdetails: ['MenuDataService', '$stateParams', function(MenuDataService, $stateParams) {
      return MenuDataService.getItemDetailsForCategoryItem($stateParams.category, $stateParams.itemId)
        .then(function(response) {
	   const itemDetailData = response.data[$stateParams.category][$stateParams.itemId];

*/
   
    itemDetails: ['MenuDataService', '$stateParams', function(MenuDataService, $stateParams) {
 console.log("In itemDetails, category:"+$stateParams.category);
    console.log("itemId:"+$stateParams.itemId);
      return MenuDataService.getItemDetails($stateParams.category,$stateParams.itemId)
        .then(function(response) {
	  console.log(response.data);
	   const itemDetailDatas = response.data.menu_items;
	    console.log("itemDetailDatas:"+itemDetailDatas);
	   const itemDetailData = itemDetailDatas[$stateParams.itemId];
			console.log(itemDetailData);
          return itemDetailData? itemDetailData:[];
        });
    }]
  }
})
	


	
} // end of RoutesConfig

})();
