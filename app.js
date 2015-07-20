// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic'])

.run(function ($ionicPlatform) {
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


   .controller('taxilist', function ($scope) {
       
        $scope.taxies = [
        { rego: "FRG567", Name: "John Smith", Cab: "22" },
        { rego: "KGV456", Name: "Jane Smith", Cab: "18" },
        { rego: "bgh768", Name: "Ben Smith", Cab: "65" },
        { rego: "kdg568", Name: "Sam Smith", Cab: "121" },
        { rego: "kkf844", Name: "Neil Smith", Cab: "94" }];

    })


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





  
})

.config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

        .state('home', {
            url: '/home',
            templateUrl: '/views/home.html'
        })


        .state('search', {
            url: '/search',
            templateUrl: '/views/search.html'
        })

      .state('newincident', {
          url: '/newincident',
          templateUrl: '/views/newincident.html'
      })
    .state('login', {
        url: '/login',
        templateUrl: '/views/login.html'
    })

      
    ;

    // if none of the above states are matched, use this as the fallback

    $urlRouterProvider.otherwise('home');


});