'use strict';
// Handle the Login Controller
angular.module('fiveSearches').controller('LoginCtrl', ['$scope', '$location', '$meteor', function ($scope, $location, $meteor) {

    // Available Sites
    $scope.availableSites = ['Google', 'Yahoo', 'Facebook', 'Vimeo', 'LinkedIn', 'Twitter'];

  }]);