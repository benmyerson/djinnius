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

	.controller('WorldsCreateCtrl', function ($window, $scope, FBUtils, $q, $mdDialog) {
		var vm = this;
		var newWorldRef = firebase.database().ref('worlds').push();
		$window.URL = $window.URL || $window.webkitURL;
		this.ref = newWorldRef;
		this.newWorld = {
			name: '',
			description: '',
			mainImage: ''
		};


		this.enlargeImage = function ($event, img) {
			var parentEl = angular.element(document.body);
	       $mdDialog.show({
	         parent: parentEl,
	         targetEvent: $event,
	         template:
	           '<md-dialog aria-label="Image Dialog">' +
	           '  <md-dialog-content>'+
	           '    <img class="dialog-img" src ng-src="{{image}}">' +
	           '  </md-dialog-content>' +
	           '  <md-dialog-actions>' +
	           '    <md-button ng-click="closeDialog()" class="md-primary">' +
	           '      Close' +
	           '    </md-button>' +
	           '  </md-dialog-actions>' +
	           '</md-dialog>',
	         locals: {
	           image: img
	         },
	         controller: DialogController
	      });
		};


    function DialogController($scope, $mdDialog, image) {
      $scope.image = image;
      $scope.closeDialog = function() {
        $mdDialog.hide();
      };
    }

		this.save = function () {
			this.ref.set(this.newWorld)
			.then(function(){
				return $q.all(angular.forEach(vm.files,function(file) {
					console.log('uploading file', file);
					return FBUtils.uploadFile($scope.$root.user.uid, file);
				}));
			})
			.catch(function(error) {
				console.error('Error Saving World:', error);
			});
		};

	})

	.controller('WorldsDetailCtrl', function(world, World) {
		console.log('worlds detail ctrl ', world, World);
	});
