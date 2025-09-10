(function() {
  'use strict';
  var LunchCheckApp = angular.module('LunchCheckApp',[]);
  LunchCheckApp.controller('LunchCheckController',LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope) {
    $scope.foodItems = "";
    $scope.message = "";

    $scope.checkLunchItems = function() {
      $scope.foodItems = $scope.foodItems.trim();
      if ($scope.foodItems == "")
      {
        $scope.message = "Please enter one food item first, the input can be one or more strings seperated by comma, the function does not expect null string item";
        $scope.color = "red";
      }
      else {
        var re =/\s*,\s*/;

        var $arrayOfItems = $scope.foodItems.split(re);

        var $length = $arrayOfItems.length;
        if ($length <= 3) {
            $scope.message = "Enjoy!";
            $scope.color = "green";
        }
        else {
            $scope.message = "You have entered Too much food items!";
            $scope.color = "red";
        }
      }
    };
}
})();
