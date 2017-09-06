
'use strict';

// Handle the Main directive
angular.module('fiveSearches').directive('iconMove', ['application', '$log', '$timeout', function (application, $log, $timeout) {
    return {
      restrict: 'AEC',
      transclude: false,
      link: function (scope, elem, obj) {
        var el = angular.element(elem);
        el.draggable({ containment: "parent" });
      }
    };

  }]);