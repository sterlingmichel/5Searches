
// bind a Meteor reactive computation to the current scope
angular.module('fiveSearches').factory('autorun', function () {
  return function (scope, fn) {
// wrapping around Deps.autorun
    var comp = Deps.autorun(function (c) {
      fn(c);
// this is run immediately for the first call
// but after that, we need to $apply to start Angular digest
      if (!c.firstRun)
        setTimeout(function () {
// wrap $apply in setTimeout to avoid conflict with
// other digest cycles
          scope.$apply();
        }, 0);
    });

// stop autorun when scope is destroyed
    scope.$on('$destroy', function () {
      comp.stop();
    });

// return autorun object so that it can be stopped manually
    return comp;
  };
});
