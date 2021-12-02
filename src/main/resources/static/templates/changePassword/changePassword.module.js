(function(){
	'use strict';

	angular.module('myApp.changePassword',[

		])
	.config(function($stateProvider){
		$stateProvider
		.state('main.ChangePassword/:userId', {
            url: "/ChangePassword/:userId",
            views: {
                "sub":
                 {
                 	templateUrl: "templates/changePassword/changePassword.html",
                 	controller: "ChangePasswordcontroller as vm"
                 }
            }
        })
	});

})();