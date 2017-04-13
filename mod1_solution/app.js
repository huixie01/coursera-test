(function() {
  'use strict';
  angular.module('LunchCheckApp',[])
  .controller('LunchCheckController',LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope) {
    $scope.foodItems = "";
    $scope.message = "";

    $scope.checkLunchItems = function() {
      $scope.foodItems = $scope.foodItems.trim();
      if ($scope.foodItems == "")
      {
        $scope.message = "Please enter data first";
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
            $scope.message = "Too much!";
            $scope.color = "red";
        }
      }
    };
}
})();
