'use strict';

/**
 * @ngdoc directive
 * @name djinniusApp.directive:djOnchange
 * @description
 * # djOnchange
 */
angular.module('djinniusApp')
  .directive('djOnchange', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        element.bind('change', function(ev) {
          scope[attrs.djOnchange](ev);
        });
      }
    };
  });
