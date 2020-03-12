'use strict';

// Configuration and routes

  angular.module('fiveSearches').config(['$interpolateProvider', '$stateProvider', '$urlRouterProvider', '$locationProvider', function ($interpolateProvider, $stateProvider, $urlRouterProvider, $locationProvider) {
      // Help Swap
      $interpolateProvider.startSymbol('[[').endSymbol(']]');

      $urlRouterProvider.otherwise("/login");
      $stateProvider
              .state('home', {
                url: '/home',
                templateUrl: 'client/html/views/home.ng.html',
                //template: UiRouter.template('home.ng.html'),
                controller: 'HomeCtrl'
              })
              .state('login', {
                url: '/login',
                abstract: false,
                templateUrl: 'client/html/views/login.ng.html',
                controller: 'LoginCtrl'
              });

      $locationProvider.html5Mode(true);
    }]);
