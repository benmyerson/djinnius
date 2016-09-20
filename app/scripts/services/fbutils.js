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
            },

            getFile: function(path) {
              var storage = firebase.storage();
              var storageRef = storage.ref(path);

              return storageRef;
            },

            uploadFile: function(userPath, file) {
              var storageRef = firebase.storage().ref();
              var newFileRef = storageRef.child(userPath + '/' + file.name);
              return newFileRef.put(file);
            }
        };
    });
