(function() {
	'use strict';

	angular
	.module('myApp.myDestails', [])
	.config(function($stateProvider) {
				$stateProvider
				.state('main.myDestails', {
					url : "/myDestails",
					views : {
						"sub" : {
							templateUrl : "templates/myDestails/myDestails.html",
							controller : "MyDestailsController as vm"
						}
					}
				})
			});

})();