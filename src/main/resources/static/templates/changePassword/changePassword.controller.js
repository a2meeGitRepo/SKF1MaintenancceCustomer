(function() {
	'use strict';

	angular	.module('myApp.changePassword').controller('ChangePasswordcontroller', ChangePasswordcontroller);


	ChangePasswordcontroller.$inject = ['$rootScope','$http','$stateParams','$scope','$state','localStorageService','toastr', 'ApiEndpoint','loginFactory','$location','$window','genericFactory'];

	/* @ngInject */
	function ChangePasswordcontroller($rootScope, $http,$stateParams, $scope, $state, localStorageService,toastr, ApiEndpoint, loginFactory,$location,$window,genericFactory) {
		var userUrl = ApiEndpoint.url+"userLogin";
		var empUrl = ApiEndpoint.url+"employee";
		var accessUrl = ApiEndpoint.url+"access";
		var userDetail = localStorageService.get(ApiEndpoint.userKey);
		var sId=$stateParams.userId;
		console.log("State Param sId:"+JSON.stringify($stateParams.userId))
		var vm = angular.extend(this, {
		
			validatePassword:validatePassword,
			updatePassword:updatePassword,
			cmpPass:cmpPass,
			cancel:cancel

		});
		
		$scope.formAdmin=false;
		
		function getUserById(){		
			
			$scope.formAdmin=true;
			
		}
		
		(function activate() {
			var url=accessUrl+"/getUserById?userId="+sId;			
			var msg=""
			 genericFactory.getAll(msg,url).then(function(response){
				
				
				vm.user1=response.data;
				console.log("user1:"+JSON.stringify(vm.user1)) 
			 });
			
			$scope.userName=userDetail.userName;
			$scope.newPass=false;
			$scope.saveButton=true;
			
		})();
		/**/
		// ******************************************************
		function cmpPass(password){
			
			var passwrd=$scope.user.password
			var newpassword=$scope.user.newpassword
			if(passwrd==newpassword){
				$scope.saveButton=false
				toastr.success(" New password has confirmed..!");
			}else{
				$scope.saveButton=true
				toastr.error(" Password does not matche....!!");
			}
			
		}
		/*$scope.singIn=function (){
			$scope.loginPage=true
			$scope.forgetTab=false
		}*/
		$scope.showold=function (){
			console.log("VIEW PASS :"+$scope.viewPassold)
			if($scope.viewPassold){
				$scope.viewPassold=false
			}else{
				$scope.viewPassold=true
			}
		}
		
		
		$scope.shownew=function (){
			console.log("VIEW PASS :"+$scope.user.password)
			if($scope.viewPassnew){
				$scope.viewPassnew=false
			}else{
				$scope.viewPassnew=true
			}
		}
		
		
		$scope.showcnf=function (){
			console.log("VIEW PASS :"+$scope.viewPasscnf)
			if($scope.viewPasscnf){
				$scope.viewPasscnf=false
			}else{
				$scope.viewPasscnf=true
			}
		}
		
		/*$scope.passwordEnter=function (password){
		
			if(password.length >= 8){
				$scope.saveButton=false
			}else{
				$scope.saveButton=true
			}
			
		}*/
/*******************************validate Password *****************************************************/		
function validatePassword(oldPassword){
	
	 
	console.log("PASS :"+JSON.stringify(oldPassword))
	
			console.log("vm.user1.password  :"+JSON.stringify(vm.user1.password ))
		if(vm.user1.password ==oldPassword){
			
			$scope.newPass=true;
			toastr.success(" Old Password is valid");
		}
		else{
			
			toastr.error("Password is Invalid");
		}
				
	
}
/*******************************Update Password *****************************************************/
	
function updatePassword(resUser){
	
	$rootScope.loader=true;
	/*var resUser={};
	resUser.employeeId=userDetail.employeeId
	resUser.password=$scope.user.newpassword
	console.log("userP :: "+JSON.stringify($scope.user.newpassword));*/
	vm.user1.password=$scope.user.newpassword
	console.log("resUser :: "+JSON.stringify(vm.user1));
	var msg=""								
		var  url =accessUrl+"/updateUser"
		console.log("URL :: "+url);
		genericFactory.add(msg,url,vm.user1).then(function(response) {
		vm.user = response.data;
			
			console.log("userP :: "+JSON.stringify(vm.user));
			
			if (vm.user.code==200) {
				
				$scope.newPass=false;
				
				toastr.success("Password has been updated successfully!");
				}
			else
				{					
				
			toastr.error('Error has occurred...!!');
			}

			loginFactory.ClearCredentials();
			$state.go('login');
			localStorageService.remove(ApiEndpoint.userKey);
			$rootScope.loader=false;
});
}
	

/************************************cancel************************************************/
	function cancel(){
		$location.path('main/user');
		$scope.newPass=false;
	}

		
	}
})();
