/* global _ */

'use strict';

// Handle the Main directive
angular.module('fiveSearches').directive('ews', ['$meteor', '$log', function ($meteor, $log) {
    return {
      restrict: 'AEC',
      transclude: false,
      link: function (scope, element, attrs) {
        var elm = angular.element(element);

        // Create teh taskbar at the bottom
        scope.homepage.taskbar = elm.find(".taskbar").taskbar({
          draggable: false,
          horizontalStick: "bottom left",
          windowsContainment: "viewport",
          languageSelect: false,
          clock: true,
          autoHide: false,
          buttonsTooltips: false,
          windowButtonsSortable: true,
          networkMonitor: true,
          toggleFullscreen: true
        });
      }
    };

  }]);