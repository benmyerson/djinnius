'use strict';

angular.module('djinniusApp')
    .config(function($stateProvider) {
        $stateProvider.state({
            name: 'login',
            url: '/login',
            controller: 'LoginCtrl as vm',
            templateUrl: 'views/users/login.html'
        });

    })
    .controller('LoginCtrl', function($state) {
        var vm = this,
            auth = firebase.auth(),
            errors;

        function validateRegistration() {
            errors = [];

            return !errors.length;
        }

        function validateLogin() {
            errors = [];

            return !errors.length;
        }

        vm.login = function() {
        	if (validateLogin()) {
        		auth.signInWithEmailAndPassword(vm.login.email, vm.login.password)
        			.then(function() {
                $state.go('profile.profile');
        			});
        	}
        };

        vm.loginWith = function(providerName) {
          var provider;
          if (providerName === 'google') {
            provider = new firebase.auth.GoogleAuthProvider();
          } else if(providerName === 'github'){
            provider = new firebase.auth.GithubAuthProvider();
          }
          auth.signInWithPopup(provider).then(function() {
            $state.go('profile.profile');
          })
          .catch(function(err){
            console.error(err);
          });
        };

        vm.register = function() {
            if (validateRegistration()) {
                auth.createUserWithEmailAndPassword(vm.register.email, vm.register.password)
                    .then(function() {
                      $state.go('profile.profile');
                    });
            }
        };
    });
