'use strict';

/**
 * @ngdoc directive
 * @name djinniusApp.directive:appHeader
 * @description
 * # appHeader
 */
angular.module('djinniusApp')
  .directive('appHeader', function () {
    return {
      templateUrl: 'views/directive/app-header.html',
      restrict: 'E',
      link: function postLink() {
        // element.text('this is the appHeader directive');
      }
    };
  });
