'use strict';

// Handle the main login ciruclar
angular.module('fiveSearches').directive('login', ['$location', '$meteor', '$log', '$window', '$sessionStorage', function ($location, $meteorUser, $log, $window, $sessionStorage) {
    return {
      restrict: 'AEC',
      transclude: false,
      link: function (scope, element, attrs) {
        var elm = element.roundrrwheel({
          centerImageSrc: '/img/icon.png',
          autoplay: true,
          autoplayDirection: 'anticlockwise',
          autoplayDuration: 3200,
          centerClass: 'roundrr_center',
          listClass: 'list',
          itemClass: 'item',
          radius: 140,
          animSpeed: 400,
          centerX: 165,
          centerY: 190,
          animationEffect: 1,
          selectEvent: "click",
          onSelect: function (el) {
            var user = null;
            var service = el.find('img').attr('title').toLowerCase();
            //console.warn("service:", service);
            switch (service) {
              case "facebook":
                user = $meteorUser.loginWithFacebook({});
                break;
              case  "google":
                user = $meteorUser.loginWithGoogle({requestPermissions: ['email', 'profile']});
                break;
              case "twitter":
                //Meteor.absoluteUrl.defaultOptions.rootUrl = "http://localhost:3000/login/";
                user = $meteorUser.loginWithTwitter({});
                break;
              default:
                break;
            }

            // Hanlde the user loggin
            user.then(function (err) {
              if (angular.isUndefined(err)) {
                //service
                $sessionStorage["service"] = service;
                $location.url('/home');
              } else {
                throw new Meteor.Error("Unable to login because of: ", err);
              }
            });
          }
        });
        elm.roundrrwheel('show');
        return elm;
      }
    };
  }]);
