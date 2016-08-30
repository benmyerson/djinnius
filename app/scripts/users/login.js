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
    .controller('LoginCtrl', function() {
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
        			.then(function(fbUser) {
        				console.log('logged in user', fbUser);
        			});
        	}
        };

        vm.register = function() {
            if (validateRegistration()) {
                auth.createUserWithEmailAndPassword(vm.register.email, vm.register.password)
                    .then(function(fbUser) {
                        console.log('created user', fbUser);
                    });
            }
        };
    });
