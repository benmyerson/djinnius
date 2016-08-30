'use strict';

angular.module('djinniusApp')
	.config(function($stateProvider){
		$stateProvider.state({
	 		name: 'users',
	 		url: '/users',
	 		controller: 'UsersCtrl as vm',
	 		templateUrl: 'views/users/index.html'
	 	});
	 	
	})
	.factory('User', function (){
		
		function User() {
			var paths = ['users/{uid}'];
			console.log(paths);
			return {
				
			};
		}

		return User;

	})
	.controller('UsersCtrl', function (User) {
   		console.log('Users ctrl', User);

	});