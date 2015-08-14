angular.module('app').controller('submitreport', function($scope, $ionicPopup, $timeout){

    $scope.showConfirm = function () {
        var confirmPopup = $ionicPopup.confirm({
            title: 'Report',
            template: 'Are you sure you want to submit this report?'
        });
        confirmPopup.then(function (res) {
            if (res) {
                console.log('Record submited');
            } else {
                console.log('The guy pussied out!!');
            }
        });
    };


});