(function() {
	'use strict';

	angular
	.module('myApp.login')
	.controller('loginController', loginController);


		loginController.$inject = ['$rootScope','$stateParams','$scope','$state','localStorageService','toastr', 'ApiEndpoint','loginFactory','$location','$window','genericFactory'];

	/* @ngInject */
	function loginController($rootScope, $stateParams, $scope, $state, localStorageService,toastr, ApiEndpoint, loginFactory,$location,$window,genericFactory) {
		var userUrl = ApiEndpoint.url+"userLogin";
		var customerUrl = ApiEndpoint.url+"customer";
		var authenticationUrl = ApiEndpoint.url+"authentication";
		var accessUrl = ApiEndpoint.url+"access";
		var vm = angular.extend(this, {
			
			doLogin : doLogin,
			validateEmailId:validateEmailId,
			updatePassword:updatePassword,
			registerMe:registerMe,
			register:register

		});

		(function activate() {
			$scope.loginPage=true;
			$scope.forgetTab=false;
			$scope.registerTab=false;
		
			$scope.setPass=false;
			$scope.saveButton=true;
			$scope.registerTab=false
			//getAllRoles();
		})();
		/**/
		// ******************************************************
		function registerMe(){
			$scope.loginPage=false;
			$scope.forgetTab=false;
			$scope.setPass=false;
			$scope.saveButton=false;
			$scope.registerTab=true
		}
		
		$scope.loginScr=function(){
			$scope.loginPage=true
			$scope.forgetTab=false
			$scope.registerTab=false;
		}
		
		$scope.forgotPass=function (){
			$scope.loginPage=false
			$scope.forgetTab=true
			
			$scope.registerTab=false;
		}
		/*$scope.singIn=function (){
			$scope.loginPage=true
			$scope.forgetTab=false
		}*/
		$scope.show=function (){
			console.log("VIEW PASS  "+$scope.viewPass)
			if($scope.viewPass){
				$scope.viewPass=false
			}else{
				$scope.viewPass=true
			}
		}
		
		$scope.passwordEnter=function (password){
		
			if(password.length >= 8){
				$scope.saveButton=false
			}else{
				$scope.saveButton=true
			}
			
		}
/*******************************forgot Password *****************************************************/		
		
		
		function register(customer){
			console.log("customer	: "+JSON.stringify(customer))
			
			var msg=""								
		var  url =customerUrl+"/addCustomerRegistration"
		console.log("URL :: "+url);
		genericFactory.login(msg,url,customer).then(function(response) {
		vm.user = response.data;
		console.log("userP :: "+JSON.stringify(vm.user));
			//return;
			
			
			if (vm.user.code==200) {
				
				$scope.loginPage=true;
				$scope.registerTab=false;
				
				toastr.success(vm.user.message);
				}
			else
				{					
				
			toastr.error('Un Sucessfully...!!');
			}

				});
			
			
		}
function validateEmailId(user){
	
	
			
			var msg=""								
				var  url =empUrl+"/eMailList?emailId="+user.emailId
				console.log("URL :: "+url);
				genericFactory.getAll(msg,url).then(function(response) {
					vm.user = response.data;
					
					$scope.resUser= response.data;;
					if (vm.user != "") {	
						
						$scope.setPass=true;
						toastr.success('Email is Valid...!!');
						}
					else
						{					
						
					toastr.error('Email Does not match...!!');
					}
		
		});
		}
/*******************************Update Password *****************************************************/
function updatePassword(password){
	
	$scope.resUser.password=password;
	console.log("userP :: "+JSON.stringify($scope.resUser));
	
	var msg=""								
		var  url =empUrl+"/updateByForgetPass"
		console.log("URL :: "+url);
		genericFactory.add(msg,url,$scope.resUser).then(function(response) {
		vm.user = response.data;
			
			console.log("userP :: "+JSON.stringify(vm.user));
			
			if (vm.user.code==200) {
				
				$scope.loginPage=true;
				$scope.forgetTab=false;
				
				toastr.success(vm.user.msg);
				}
			else
				{					
				
			toastr.error('Email Does not match...!!');
			}

});
}
	

/*******************************Login *****************************************************/
		function doLogin(user){

			var msg=""	
				var  url =authenticationUrl+"/login"
		
				console.log("url	: "+url)
			
			genericFactory.login(msg,url,user).then(function(response) {
				vm.user = response.data.data;
				console.log("user	: "+JSON.stringify(vm.user))
				if (response.data.code==200) {
					
				
					loginFactory.SetCredentials(user);
					$location.path('/main/home');
					toastr.success(response.data.message);
					localStorageService.set(ApiEndpoint.userKey, vm.user);
					console.log("HEADER KEY "+localStorageService.get(ApiEndpoint.headerKey))
					localStorageService.set(ApiEndpoint.headerKey, response.data.token);
					var headerKey=localStorageService.get(ApiEndpoint.headerKey);
					console.log("HEADER KEY A"+headerKey)
					 var url =accessUrl+"/getPermissionsByUser?userId="+vm.user.id;
						genericFactory.getAllWithHeader(msg,url,headerKey).then(function(response) {
							console.log("url: "+url)

							vm.pemissions = response.data;
							localStorageService.set('permissions', vm.pemissions)					
							
										
					});
					//$window.location.reload();
					//$state.go('main.home');
				} else {
					
					toastr.error(vm.user.responceMsg);
				}
				
			});
		}
		
		
	}
})();
