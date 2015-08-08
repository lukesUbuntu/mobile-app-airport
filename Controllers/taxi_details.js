angular.module('app').controller("taxidetails", function (searchresults, $scope) {

    //Simple but it works well

    $scope.taxi_info = searchresults.taxiObject;

   


});