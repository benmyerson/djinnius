'use strict';

angular.module('djinniusApp')
    .config(function($stateProvider) {
        $stateProvider.state({
            name: 'profile',
            url: '/profile',
            controller: 'ProfileCtrl as vm',
            templateUrl: 'views/users/profile.html',
            abstract: true
        })
        .state({
        	name: 'profile.profile',
        	url: '',
        	controller: 'ProfileProfileCtrl as vm',
        	templateUrl: 'views/users/profile.profile.html',
            resolve: {
                'user': function($q) {
                    var d = $q.defer();

                    firebase.auth().onAuthStateChanged(function(user) {
                        d.resolve(user);
                    });
                    return d.promise;
                }
            }

        })
        .state({
        	name: 'profile.accounts',
        	url: '/accounts',
        	controller: 'ProfileAccountsCtrl as vm',
        	templateUrl: 'views/users/profile.accounts.html'
        })
        .state({
            name: 'profile.worlds',
            url: '/worlds',
            controller: 'ProfileWorldsCtrl as vm',
            templateUrl: 'views/users/profile.worlds.html'
        });
    })
    .controller('ProfileCtrl', function() {
    	console.log('profile');
    })
    .controller('ProfileWorldsCtrl', function() {


    })
    .controller('ProfileProfileCtrl', function($rootScope) {
    	var vm = this,
            fbProfile;

        vm.assignPhoto = function(url) {
            console.log('change that value');
            if (!$rootScope.profile){
                $rootScope.profile = {};
            }
            $rootScope.profile.photoURL = url;
        };

        $rootScope.$watch('profile', function(newVal) {
            if ($rootScope.user && newVal) {
                fbProfile = firebase.database().ref('profiles/' + $rootScope.user.uid);
                fbProfile.set(newVal);
            }
        }, true);



    })
    .controller('ProfileAccountsCtrl', function($rootScope, $mdDialog){

        this.linkProvider = function(p, alreadyLinked) {

            var provider,
            	providerLinked;

            if (p === 'google') {
                provider = new firebase.auth.GoogleAuthProvider();
            	provider.addScope('email');
            	provider.addScope('profile');
                providerLinked = $rootScope.googleLinked;
            } else if (p === 'github') {
                provider = new firebase.auth.GithubAuthProvider();
                provider.addScope('user');
                providerLinked = $rootScope.githubLinked;
            } else {
                console.error('unknown provider');
                return;
            }


            if ($rootScope.user) {
                if (!alreadyLinked) {
                    $rootScope.user.linkWithPopup(provider).then(function(result) {
                    	result.user.reauthenticate(result.credential);
                    }).catch(function(error) {
                      console.error('link error ', error, $mdDialog);
                    });
                } else {
                    $rootScope.user.unlink(p + '.com').then(function(result) {
                    	$rootScope.$apply(function () {
                    		$rootScope.getAuthData(result);
                    		console.log($rootScope);
                    	});
                    }, function(error) {
                        console.error('unlink error', error);
                    });
                }
            } else {
                console.error('no user obj');
            }
        };
    });
