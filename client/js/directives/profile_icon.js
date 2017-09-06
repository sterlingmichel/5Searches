// Handle the Main directive
angular.module('fiveSearches').directive('profileIcon', ['$timeout', '$log', function ($timeout, $log) {
    return {
      restrict: 'AEC',
      transclude: false,
      link: function (scope, element, attrs) {
        var thetimer = 0;
        var html = $('div.profilecontent').contents();
        element.css({cursor: 'pointer'});

        //may need to recompile with each click
        thetimer = $timeout(function () {
          element.tooltipster({
            animation: 'fade',
            delay: 1200,
            theme: 'tooltipster-fivesearch',
            touchDevices: false,
            trigger: 'click',
            content: html,
            autoClose: false,
            hideOnClick: true
          });
          $timeout.cancel(thetimer);
        }, 1000);

        html.on('click', function () {
          try {
            element.tooltipster('hide');
          } catch (e) {

          }
        });

        $('div[ews]').on('click', function () {
          element.tooltipster('hide');
        });

      }
    };
  }]);