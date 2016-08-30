'use strict';

/**
 * @ngdoc service
 * @name djinniusApp.FBUtils
 * @description
 * # FBUtils
 * Factory in the djinniusApp.
 */
angular.module('djinniusApp')
    .factory('FBUtils', function($q, $rootScope, $timeout) {


        // Public API here
        return {
            
            bind: function(container, propName, ref) {

                ref.on('value', function(snap) {
                    $timeout(function() {
                        container[propName] = snap.val();
                    });
                });

                $rootScope.$watch(function() {
                    return container[propName];
                }, function(newValue) {
                    if (newValue) {
                        ref.set(newValue);
                    }
                }, true);

            },
            getFBObject: function(fbPath) {

                var ref = firebase.database().ref(fbPath),
                    deferred = $q.defer();
                ref.once('value', function(snap) {
                    deferred.resolve(snap);
                }, function() {
                    deferred.reject();
                });

                return deferred.promise;
            }
        };
    });
