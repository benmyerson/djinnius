'use strict';

/**
 * @ngdoc directive
 * @name djinniusApp.directive:djGallery
 * @description
 * # djGallery
 */


angular.module('djinniusApp')
  .directive('djGallery', function($window, $mdDialog) {
    return {
      templateUrl: 'views/directive/djGallery.html',
      restrict: 'E',
      scope: {
        readonly: '=',
        images: '=',
        label: '@',
        multiple: '='
      },
      link: function postLink(scope, element) {
        var picker = element.find('input')[0];
        scope.files = [];

        scope.processFiles = function(files) {
          scope.files = files;
          scope.uploadedFiles = [];
          for (var i = 0; i < scope.files.length; i++) {
            scope.uploadedFiles.push({
              path: $window.URL.createObjectURL(scope.files[i]),
              name: scope.files[i].name,
              size: scope.files[i].size,
              main: i === 0
            });
          }
          scope.$apply();
        };


        element.on('dragenter', function(ev) {
            ev.stopPropagation();
            ev.preventDefault();
          })
          .on('dragover', function(ev) {
            ev.stopPropagation();
            ev.preventDefault();
          })
          .on('drop', function(ev) {
            ev.stopPropagation();
            ev.preventDefault();

            var dt = ev.dataTransfer;
            scope.processFiles(dt.files);
          });

        scope.fileRead = function(event) {
          scope.processFiles(event.target.files);
        };
        scope.openFilePicker = function() {
          picker.click();
        };

        scope.enlargeImage = function(ev, num) {

          $mdDialog.show({
              controller: function($scope, $mdDialog) {
                $scope.topIndex = num;
                $scope.uploadedFiles = scope.uploadedFiles;
                $scope.close = function(anything) {
                  $mdDialog.hide(anything);
                };
                $scope.cancel = function() {
                  $mdDialog.cancel();
                };
              },
              templateUrl: 'views/directive/djGallery.dialog.html',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: true,
              fullscreen: true // Only for -xs, -sm breakpoints.
            })
            .then(function() {

              scope.$apply(); //updates to the inline gallery
            });
        };
      }
    };
  });
