'use strict';

angular.module('djinniusApp')
	.factory('World', function (User){
		
		function World() {
			var paths = ['worlds/{id}', 'user/{uid}/worlds/{id}'];
			console.log(paths, User);
			return {
	

			};
		}

		return World;

	})

	.config(function($stateProvider){
		$stateProvider.state({
	 		name: 'worlds',
	 		url: '/worlds',
	 		controller: 'WorldsCtrl as vm',
	 		templateUrl: 'views/worlds/index.html'
	 	})
	 	.state({
	 		name: 'worldCreate',
	 		url: '/worlds/new',
	 		controller: 'WorldsCreateCtrl as vm',
	 		templateUrl: 'views/worlds/create.html'
	 	})
	 	.state({
	 		name: 'worldsDetail',
	 		url: '/worlds/:worldId',
	 		controller: 'WorldsDetailCtrl as vm',
	 		templateUrl: 'views/worlds/detail.html',
	 		resolve: {
	 			'world': function($q){
	 				var d = $q.defer();
	 				d.resolve({
	 					name: 'Name',
	 					description: 'Description'
	 				});
	 				return d.promise;
	 			}
	 		}
	 	});
	 	
	})

	.controller('WorldsCtrl', function () {
   		console.log('worlds ctrl');

	})

	.controller('WorldsCreateCtrl', function () {
		var newWorldRef = firebase.database().ref('worlds').push();

		this.ref = newWorldRef;	
		this.newWorld = {
			name: '',
			description: ''

		};

		this.save = function () {
			this.ref.set(this.newWorld).then(function(saved){
				console.log('Saved!', saved);
			}, function(error) {
				console.error('Error Saving World:', error);
			});
		};

	})

	.controller('WorldsDetailCtrl', function(world, World) {
		console.log('worlds detail ctrl ', world, World);
	});