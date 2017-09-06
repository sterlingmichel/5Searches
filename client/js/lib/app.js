//InstallApps = new Meteor.Collection('install_apps');

// Load install app

/* Load all the user install application */
InstallApps = new Mongo.Collection('install_apps');

/* Load all the available Application authorized */
Applications = new Mongo.Collection('applications');

/* load the Chat Messages */
ChatMessages = new Mongo.Collection('chat_messages');

/* Load all the chat User */
AvailableSites = new Mongo.Collection('available_sites');

'use strict';

//Main App configuration and initialization 
angular.module('fiveSearches', ['angular-meteor', 'ui.router', 'ngRoute', 'ngStorage', 'angular.filter']);

// Run against any routes
angular.module('fiveSearches').run(['$rootScope', '$route', '$state', '$stateParams', '$location', '$log', '$urlRouter', '$window', 
  function ($rootScope, $route, $state, $stateParams, $location, $log, $urlRouter, $window) {

    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
      $rootScope.title = $route.current.title;
    });

    $rootScope.$on('$stateChangeSuccess', function (event, route, current) {
      if (!angular.equals(route.url, '/login')) {
        if (angular.isUndefined($window.localStorage['Meteor.userId'])) {
          $location.url('/login');
        }
      } 
      
      /*
      if (angular.equals(route.url, '/login')) {
        console.warn("==", angular.isDefined($window.localStorage['Meteor.userId']));
        if (angular.isDefined($window.localStorage['Meteor.userId'])) {
          $location.url('/home');
        } 
      }
      */
    });

  }]);