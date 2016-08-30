'use strict';

/**
 * @ngdoc overview
 * @name djinniusApp
 * @description
 * # djinniusApp
 *
 * Main module of the application.	
 */
angular
    .module('djinniusApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngTouch',
        'ui.bootstrap',
        'ui.router'
    ])

    .run(function($rootScope, FBUtils) {
    	var auth = firebase.auth();
    	
		$rootScope.getAuthData = function (firebaseUser) {
			$rootScope.user = undefined;
			$rootScope.profile = undefined;
			$rootScope.userPhotos = [];

			$rootScope.user = firebaseUser;
			angular.extend($rootScope, {
				googleLinked: false, 
				githubLinked: false,
				twitterLinked: false,
				facebookLinked: false
			});

			angular.forEach(firebaseUser.providerData, function(provider) {
				
				if (provider.providerId === 'google.com') {
					provider.pName = 'google';
					$rootScope.googleLinked = true;
				}else if (provider.providerId === 'github.com') {
					provider.pName = 'github';
					$rootScope.githubLinked = true;
				}
			});

			FBUtils.getFBObject('profiles/' + firebaseUser.uid).then(function (profileObject) {
				if (profileObject.val()) {
					$rootScope.profile = profileObject.val();
				} else {
					// $state.go('profile');
					$rootScope.profile = {};
				}
			}, function() {
				console.error('no users/' + firebaseUser.uid + ' info');
			});
		};

		auth.onAuthStateChanged($rootScope.getAuthData);	
    });
