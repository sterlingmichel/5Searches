angular.module('fiveSearches')
        .factory('application', ['$log', '$filter', '$meteor', '$sessionStorage', '$compile', '$templateFactory',
          function ($log, $filter, $meteor, $sessionStorage, $compile, $templateFactory) {

            var createMoveIcon = function (scope, appobj) {

              if (scope.homepage.openApp.hasOwnProperty(appobj.shortName)) {
                if (angular.equals(scope.homepage.openApp[appobj.shortName], true)) {
                  return;
                }
              }


//          NProgress.start();
//          NProgress.done()
              var cleanapp = $filter('cleanapp')(appobj.appName);
              var name = scope.homepage.taskbar.attr('id') + "-" + cleanapp;

              // create the core div
              var $win = $('<div></div>');
              $win.addClass(cleanapp + 'Window');
              // create the internal div
              var desc = $('<div></div>');
              // put the content
              $win.append(desc);
              // add the content
              desc.addClass('description');
              // pull the html
              //.warn(cleanapp + '.ng.html'); //application_manager.ng
              //desc.html( UiRouter.template( 'client/html/application/' + cleanapp + '.ng.html' ) );
              desc.html($templateFactory.fromUrl('client/html/application/' + cleanapp + '.ng.html'));
              //$win.html(UiRouter.template(cleanapp + '.ng.html'));
              //compile the new content
              $compile(angular.element($win))(scope);

              // apply to the current scope
              //scope.$digest();
              var updateSize = function (evt) {
                var elm = $(evt.target);
                var minDesc = elm.find('> div.description');
                var liteAccordion = elm.find('> div.description div.liteAccordion');

                minDesc.animate({
                  'height': elm.parents().height() + 'px',
                  'width': elm.parents().width() + 'px'
                });

                if (liteAccordion.data('liteAccordion')) {
                  liteAccordion.liteAccordion('resize', {containerWidth: minDesc.width(), containerHeight: minDesc.height()});
                }
              };

              $win.window({
                height: appobj.height,
                width: appobj.width,
                taskbar: scope.homepage.taskbar,
                modal: appobj.modal,
                title: appobj.appName,
                closable: true,
                maximizable: appobj.maximize,
                minimizable: appobj.minimize,
                resizable: true,
                create: function (event, ui) {
                  updateSize(event);
                },
                show: function () {
                },
                beforeShow: function () {
                },
                beforeClose: function () {
                },
                close: function () {
                  scope.homepage.openApp[appobj.shortName] = false;
                },
                maximize: function (event, ui) {
                  updateSize(event);
                },
                restore: function (event, ui) {
                  updateSize(event);
                },
                resize: function (event, ui) {
                  //updateSize(event);
                },
                icons: {
                  main: $filter('cleanapp')(appobj.shortName) + "icon" // add class
                }
              });

              // Store the state of active
              scope.homepage.openApp[appobj.shortName] = true;

            };

            return {
              createMoveIcon: createMoveIcon
            };
          }]);
