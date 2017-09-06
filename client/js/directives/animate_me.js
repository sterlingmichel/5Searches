'use strict';

// Handle the Main directive
angular.module('fiveSearches').directive('animateMe', ['$animate', '$log', function ($animate, $log) {
    return {
      restrict: 'AEC',
      transclude: false,
      link: function (scope, element, attrs) {
        element.on('focusout', function() {
          element.animate({width: 190});
           //$log.warn($animate);
        });
         element.on('focus', function() {
             element.animate({width: 290});
         });
      }
    };
}]);