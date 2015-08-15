﻿angular.module('app').controller('searchTaxi', function (taxiObject, $scope,$state, $http, $ionicLoading, $ionicPopup) {

    //watch our taxi object for changes
    $scope.$watch(function () {
            return taxiObject.record;
        },
        function(newVal, oldVal) {
            //set the update record to true if this record has been updated
            taxiObject.updated =  (oldVal != null && newVal != oldVal)
        }, true);
   
    var api = {
        path: "http://taxi.nzhost.me/api/",
        key: "",
        call: function (call) {
            return this.path + call + '?callback=JSON_CALLBACK';

        }
    }

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
        $http.jsonp(api.call('getdetails'), {
            params: {
                reg: registration

            }
        }
        ).success(function (response, status, headers, config) {
            //check response
            if (response.success) {
                console.log("response.data", response.data)

                //This will send the object to the defined service, the object will now be avalible to 
                //other controllers if we inject the service as I have above. Once we are returning multiple results
                //we will set this below on gotodetails function
                //searchresults.taxiObject = response.data;
                taxiObject.record = response.data;
                $scope.taxi_info = taxiObject.record;

                //$scope.taxi_info = response.data;
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

    $scope.gotodetails = function () {

        $state.go("details");
    };

});