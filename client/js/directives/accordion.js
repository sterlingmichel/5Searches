// Handle the Main directive
angular.module('fiveSearches').directive('accordion', ['$log', '$timeout', function ($log, $timeout) {
    return {
      restrict: 'AEC',
      transclude: false,
      link: function (scope, element, attrs) {
        $timeout(function () {
          element.liteAccordion({
            theme: 'light',
            slideSpeed: 600,
            pauseOnHover: true,
            enumerateSlides: true,
            activateOn: 'click',
            containerWidth: '1000',
            containerHeight: 450,
            responsive: true,
            rounded: true,
            firstSlide: 1
          });

        }, 100);

      }
    };
  }]);