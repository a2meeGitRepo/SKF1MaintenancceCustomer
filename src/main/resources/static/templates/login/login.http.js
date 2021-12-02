(function () {
	'use strict';

	angular
		.module('myApp.login')
		.factory('loginHttpFactory', loginHttpFactory);

	loginHttpFactory.$inject = ['$http', '$q', '_', 'localStorageService', 'ApiEndpoint'];

	/* @ngInject */
	function loginHttpFactory($http, $q, _, localStorageService, ApiEndpoint) {
		
		var user = localStorageService.get(ApiEndpoint.userKey);
		var userUrl = ApiEndpoint.url+"user";   // User Url
		
		// Variables
		var users = {};

		var service = {
			doLogin : doLogin
		};

		return service;
		
		function doLogin(login){
			console.log(JSON.stringify(login))
			return $http.post(userUrl+'/login', login);
		}
		
	}
})();
