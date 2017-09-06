// Handle the Main directive
angular.module('fiveSearches').directive('toolTip', ['$log', function ($log) {
    return {
      restrict: 'AEC',
      transclude: false,
      link: function (scope, element, attrs) {
        element.css('cursor', 'pointer');
        element.tooltipster({
          animation: 'fade',
          theme: 'tooltipster-fivesearch',
          touchDevices: true,
          contentAsHTML: true,
          content: "<div class='tooltipmsg'>" + attrs.title + "</div>",
          autoClose: true
        });
      }
    };
  }]);