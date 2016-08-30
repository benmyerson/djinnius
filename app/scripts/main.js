'use strict';

angular.module('djinniusApp')
	.config(function($stateProvider){
		$stateProvider.state({
	 		name: 'main',
	 		url: '/',
	 		controller: 'MainCtrl as vm',
	 		templateUrl: 'views/main.html'
	 	});
	})
	.controller('MainCtrl', function () {
   		console.log('ctrl');

	});