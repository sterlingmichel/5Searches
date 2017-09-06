/* global angular, Applications */

'use strict';

// Handle the Home Controller
angular.module('fiveSearches').controller('HomeCtrl',
        ["$scope", "$window", "$log", "$meteor", "$location", "$sessionStorage", "application", '$timeout', '$collection',
          function ($scope, $window, $log, $meteor, $location, $sessionStorage, application, $timeout, $collection) {

            // store subscription object
            $scope.application_subscriptionHandle = null;
            $scope.install_subscriptionHandle = null;
            $scope.user_subscriptionHandle = null;
            $scope.chatuser_subscriptionHandle = null;
            $scope.availablesites_subscriptionHandle = null;

            $scope.appManager = {
              appName: "Application Manager",
              shortName: "appManager",
              height: 500,
              width: 800,
              modal: true,
              maximize: false,
              minimize: false
            };
            $scope.pagelimit = 10;
            $scope.perPage = 10;
            //$scope.sort = "";

            // Store the states of HomePage
            $scope.homepage = {
              openApp: {},
              selectedSpace: angular.isDefined($sessionStorage['selectedSpace']) ? $sessionStorage['selectedSpace'] : 1,
              spaces: {
                1: {},
                2: {},
                3: {},
                4: {}
              },
              limit: 10,
              page: 1,
              chat_msg: '',
              scrollTimer: 0,
              user: {},
              sites: {
                AvailableSites: []
              },
              chat: {
                chat_user_details: null,
                chat_messages: [],
                chat_users: []
              },
              taskbar: null,
              installApps: [],
              availableApps: [],
              desktopElement: null, // store the desktop element
              //service: angular.isDefined($sessionStorage['service']) ? $sessionStorage['service'] : 'fivesearches'
              service: $sessionStorage["service"]
            };

//debugger;

            // Fetch for new the users detail
            $meteor.subscribe('users').then(function (user_subscriptionHandle) {

              // Fetch all the user with Details
              $scope.homepage.chat.chat_user_details = _.indexBy($meteor.collection(Meteor.users), '_id');

              // Fetch all the user with Details
              $scope.homepage.chat.chat_user_details = _.indexBy($meteor.collection(Meteor.users), '_id');

              // Fetch Current User details
              $scope.homepage.user = $scope.homepage.chat.chat_user_details[Meteor.user()._id];

              // Remove the current element
              delete $scope.homepage.chat.chat_user_details[Meteor.user()._id];
            });

            // Fetch for the install apps
            $meteor.subscribe('installapps')
                    .then(function (install_subscriptionHandle) {
                      // store the handler
                      $scope.install_subscriptionHandle = install_subscriptionHandle;

                      // Fetch All Active Application Base on User Id
                      $scope.homepage.installApps = $meteor.collection(InstallApps, true, {user_id: $scope.homepage.user._id});

                      // Create an Array of the install app ids
                      $scope.appids = _.map($scope.homepage.installApps, function (app) {
                        return app.app_id;
                      });

                    })
                    .finally(function (err, data) {

                      // Create the application
                      $meteor.subscribe('applications', $scope.appids)
                              .then(function (application_subscriptionHandle) {
                                // store the handler
                                $scope.application_subscriptionHandle = application_subscriptionHandle;

                                // Fetch the Application collection
                                $scope.homepage.availableApps = $meteor.collection(Applications);

                              })
                              .finally(function (err, data) {
                                $scope.homepage.availableApps = _.indexBy($scope.homepage.availableApps, '_id');

                                // Fetch all the chatId
                                $collection(Applications, {}, {fields: {_id: true}}).bindOne($scope, "echatObj", {shortName: 'eChat'});

                                // Fetch all Available user that have subscribe for the chat
                                $scope.homepage.chat.chat_users = $meteor.collection(InstallApps, true, {app_id: $scope.echatObj._id, user_id: {$ne: $scope.homepage.user._id}});

                                // Grab the first to help hightlight
                                if ($scope.homepage.chat.chat_users.length > 0) {
                                  $scope.homepage.selectedActiveUser = $scope.homepage.chat.chat_users[0].user_id;
                                }
                              });
                    });

            // Fetch all current chat messages
            $meteor.subscribe('chatmessages')
                    .then(function (chatuser_subscriptionHandle) {
                      $scope.chatuser_subscriptionHandle = chatuser_subscriptionHandle;
                      // Fetch for chat contents    
                      $scope.homepage.chat.chat_messages = $meteor.collection(ChatMessages);
                    });


            // Fetch all site configuration
            $meteor.subscribe('availablesites')
                    .then(function (availablesites_subscriptionHandle) {
                      $scope.availablesites_subscriptionHandle = availablesites_subscriptionHandle;
                      // Fetch for chat contents    
                      $scope.homepage.sites.availablesites = _.groupBy($meteor.collection(AvailableSites), function (obj) {
                        return obj.category;
                      });

                    });

            $scope.scroll = function (event) {
              event.preventDefault();
              var elm = $('.chat_msg ul');
              $scope.homepage.scrollTimer = $timeout(function () {
                elm.stop();
                elm.animate({scrollTop: 99999999}, 10);
              }, 50);
            };

            $scope.sendChat = function (event) {
              if (angular.equals(event.keyCode, 13)) {
                var from_user_id = $scope.homepage.user._id,
                        secret = $sessionStorage["secret"],
                        msg = $scope.homepage.chat.chat_msg,
                        to_user_id = $scope.homepage.selectedActiveUser;

                $meteor.call('add_chat_msg', from_user_id, to_user_id, secret, msg).then(function () {
                  $scope.scroll(event);
                  $scope.homepage.chat.chat_msg = "";
                });
              }
            };

            $scope.clearChat = function (from_user_id, to_user_id) {
              $meteor.call('clear_chat', from_user_id, to_user_id);
            };

            $scope.getAppDetail = function (appId) {
              return $scope.homepage.availableApps[appId];
            };

            // Fetch Chat Img Details
            $scope.getUserDetail = function (userObj) {
              if (userObj.services.hasOwnProperty('google')) {
                return userObj.services.google;
              } else if (userObj.services.hasOwnProperty('facebook')) {
                return userObj.services.facebook;
              } else if (userObj.services.hasOwnProperty('yahoo')) {
                return userObj.service.yahoo;
              } else if (userObj.services.hasOwnProperty('linked')) {
                return userObj.services.linked;
              } else if (userObj.services.hasOwnProperty('twitter')) {
                return userObj.services.twitter;
              } else {
                return {};
              }
            };

            // Handle the special icon
            $scope.createApp = function (appObj) {
              application.createMoveIcon($scope, appObj);
            };

            // Update the select space
            $scope.updateselectedSpace = function (space) {
              $sessionStorage['selectedSpace'] = $scope.homepage.selectedSpace = space;
            };

            // Update the select Chat User
            $scope.updateselectedChatUser = function (chatUserId) {
              $sessionStorage['selectedActiveUser'] = $scope.homepage.selectedActiveUser = chatUserId;
            };

            // Determine if App is install
            $scope.isInstallApp = function (appid) {
              return _.find($scope.homepage.installApps, function (app) {
                return angular.equals(app.app_id, appid);
              });
            };

            // Handle enable & disbale application
            $scope.enableApp = function (appid) {
              var status = $scope.isInstallApp(appid);

              if (!status) { // was checked
                $meteor
                        .call('updateInstallApp', $scope.homepage.user._id, appid, 'install')
                        .then(function (data, err) {
                          $scope.numberOfInstallApps = data;
                        });

              } else { //uncheck
                $meteor
                        .call('updateInstallApp', $scope.homepage.user._id, appid, 'uninstall')
                        .then(function (data, err) {
                          $scope.numberOfInstallApps = data;
                        });
              }
            };

            // Logout the current client
            $scope.logout = function () {
              $meteor.logout();
              $meteor.logoutOtherClients();
              $sessionStorage.$reset();
              $location.url('/login');
            };

            // stop all subscriptions
            $scope.$on('$destroy', function () {

              if ($scope.application_subscriptionHandle) {
                $scope.application_subscriptionHandle.stop();
              }

              if ($scope.install_subscriptionHandle) {
                $scope.install_subscriptionHandle.stop();
              }

              if ($scope.user_subscriptionHandle) {
                $scope.user_subscriptionHandle.stop();
              }

              if ($scope.chatuser_subscriptionHandle) {
                $scope.chatuser_subscriptionHandle.stop();
              }

              if ($scope.availablesites_subscriptionHandle) {
                $scope.availablesites_subscriptionHandle.stop();
              }
            });

//class="ui-layout-north
          }]);
