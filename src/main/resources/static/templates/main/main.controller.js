(function() {
	'use strict';

	angular
		.module('myApp.main')
		.controller('mainController', mainController);

		mainController.$inject = ['localStorageService', 'ApiEndpoint', '$state','loginFactory','$rootScope','genericFactory','$timeout','$scope'];

	/* @ngInject */
	function mainController(localStorageService, ApiEndpoint, $state,loginFactory,$rootScope,genericFactory,$timeout,$scope) {
		var userDetails = localStorageService.get(ApiEndpoint.userKey);
		var tansactionUrl = ApiEndpoint.url+"tansaction";
		var accessUrl = ApiEndpoint.url+"access";
		var authenticationUrl = ApiEndpoint.url+"authentication";
		var vm = angular.extend(this, {
			user:userDetails,
			doLogout : doLogout,
			user : userDetails,
			doLogout:doLogout,
		});

		(function activate() {
			$rootScope.loader=false;
			$scope.permissions  = localStorageService.get('permissions');
			givePermissions()
			console.log("user :: "+JSON.stringify(vm.user));

			 
		})();

		// ******************************************************
		$scope.goToChangePassword=function(userId){
			
			$location.path('main/ChangePassword/'+userId);
		}
		/********************************************************/
		function givePermissions(){
			

			$('.loading').hide();
		
		}
		
	
		function doLogout (){
			
			loginFactory.ClearCredentials();
			$state.go('login');
			localStorageService.remove(ApiEndpoint.userKey);
		}

	}
})();
