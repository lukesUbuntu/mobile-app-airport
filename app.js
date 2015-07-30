// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js



var app = angular.module('app', ['ionic']);

app.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        /*if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }*/
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

/**
@name : taxilist 
@author : mike murray
@description :
**/
.controller('taxilist', function ($scope) {
       
    $scope.taxies = [
    { rego: "FRG567", Name: "John Smith", Cab: "22" },
    { rego: "KGV456", Name: "Jane Smith", Cab: "18" },
    { rego: "bgh768", Name: "Ben Smith", Cab: "65" },
    { rego: "kdg568", Name: "Sam Smith", Cab: "121" },
    { rego: "kkf844", Name: "Neil Smith", Cab: "94" }];

})

/**
@name : thiscontroller 
@author : mike murray
@description :
**/
.controller('thiscontroller', function ($scope, $ionicPopup, $timeout) {
  

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

/**
@name : taxiApi 
@author : Luke Hardiman
@description : handles the calls to the taxi api
**/

app.factory('taxiApi', function ($http) {
    var api = {
        path: "http://taxi.nzhost.me/api/",
        key: "",//note implmented
        call: function (call) {
            return this.path + call + '?callback=JSON_CALLBACK';
        }
    }
    var taxiApi = function (call, prams) {
        // $http returns a promise, which has a then function, which also returns a promise
        var promise = $http.jsonp(api.call(call), {
                params: prams
            }
        ).then(function (response) {
            // The then function here is an opportunity to modify the response
            console.log("taxiApi response", response);
            // The return value gets picked up by the then in the controller.
            return response.data;
        });
        // Return the promise to the controller
        return promise;
        
    };
    return taxiApi;
})


/**
@name : searchTaxi 
@author : Luke Hardiman
@description : searches a taxi and renders information back into view
**/
.controller('searchTaxi', function ($scope, taxiApi, $ionicLoading, $ionicPopup) {
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
        var prams = {
            reg : registration
        }
        taxiApi('getDetails', prams).then(function (response) {
            console.log("getDetails", response)
            if (response.success) {
               
                $scope.taxi_info = response.data;
                $scope.searchResults = true;
            }
            else {
                //*****received bad response from server send message to user***///
                $scope.showAlert(response.data)
                console.log("bad response", response);
            }
            setTimeout(function () { $scope.hide(); }, 100)

        })
        
       
       
    }

   
        

});


app.config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'views/home.html'
        })

        .state('search', {
            url: '/search',
            templateUrl: 'views/search.html'
        })

      .state('newincident', {
          url: '/newincident',
          templateUrl: 'views/newincident.html'
      })
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html'
        });

     
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('home');


});
