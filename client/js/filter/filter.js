// Build the extra filter
angular.module('fiveSearches')
        .filter('myfilter', ['$rootScope', function ($rootScope) {
            return function (obj, userDetails) {
              var item = [];
              for (x = 0; x < obj.length; x++) {
                item.push(userDetails[obj[x].user_id]);
              }
              return item;
            };
          }])
        .filter('formatted_date', [function () {
            return function (indate) {
              if (indate) {
                var dt = moment(indate);
                return  dt.format('hh:mm:ss');
              } else {
                return "";
              }
            };
          }])
        .filter('cleanapp', [function () {
            return function (stringval) {
              return stringval.toLowerCase().replace(/\s+/g, '_');
            };
          }])
        .filter('encode', ['serialString', function (serialString) {
            return function (stringval) {
              var minify = angular.toJson(stringval);
              return serialString.encode(minify);
            };
          }])
        .filter('decode', ['serialString', function (serialString) {
            return function (encodeval) {
              var decode = serialString.decode(encodeval);
              return angular.fromJson(decode);
            };
          }])
        .filter('capitalize', [function () {
            return function (input) {
              return (!!input) ? input.replace(/([^\W_]+[^\s-]*) */g, function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
              }) : '';
            };
          }]);