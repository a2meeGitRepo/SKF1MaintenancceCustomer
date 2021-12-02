(function() {
	'use strict';

	angular
	.module('myApp.spindleServiceRequest', [])
	.config(function($stateProvider) {
				$stateProvider
				.state('main.spindleServiceRequest', {
					url : "/spindleServiceRequest",
					views : {
						"sub" : {
							templateUrl : "templates/spindleServiceRequest/spindleServiceRequest.html",
							controller : "SpindleServiceRequestController as vm"
						}
					}
				})
			});

})();