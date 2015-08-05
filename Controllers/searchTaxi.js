angular.module('app').controller('searchTaxi', function($scope, $http, $ionicLoading,$ionicPopup){

    //************show and hide boxs***********/
    $scope.show = function () {
        $ionicLoading.show({
            template: 'Loading...'
        });
    };
    $scope.hide = function () {
        $ionicLoading.hide();
    };
    //************basic alert box***********/
    $scope.showAlert = function ($message) {
        var alertPopup = $ionicPopup.alert({
            title: 'Search Failed!',
            template: $message
        });
    }
    //************Search Ajax button***********/
    $scope.search = function (registration) {

        console.log("reg", registration)
        //check reg
        //@todo add no registration was provided
        if (typeof registration == "undefined" || registration.length < 2) {
            $scope.showAlert("Incorrect REGISTRATION details")
            return false; //return error message no reg
        }
        //show loading as we are going to do ajax call
        $scope.show();

        //https://docs.angularjs.org/api/ng/service/$http
        $http.jsonp(api.call('getRegistration'), {
            params: {
                reg: registration
            }
        }
        ).success(function (response, status, headers, config) {
            //check response
            if (response.success) {
                console.log("response.data", response.data)
                $scope.taxi_info = response.data;
                $scope.searchResults = true;
            }
            else {
                //*****received bad response from server send message to user***///
                $scope.showAlert(response.data)
                console.log("bad response", response);
            }

            setTimeout(function () { $scope.hide(); }, 100)

        }).error(function (response, status, headers, config) {
            console.log("error data", response);
            $scope.hide = function () {
                $ionicLoading.hide();
            };
        })
    }



});


