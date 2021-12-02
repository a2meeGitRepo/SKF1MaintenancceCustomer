(function() {
	'use strict';

	angular.module('myApp.myDestails')
	.controller('MyDestailsController', MyDestailsController);
	MyDestailsController.$inject = [ '$state','$compile','$uibModal',
		'$log', '$scope', 'toastr', 'localStorageService', '$timeout','ApiEndpoint','genericFactory','$rootScope','$window','$filter','$http'];

	
	/* @ngInject */
	function MyDestailsController($state, $compile,$uibModal, $log,$scope, toastr, localStorageService, $timeout, ApiEndpoint , genericFactory,$rootScope,$window,$filter,$http) {

		var customerUrl = ApiEndpoint.url+"customer";
		var commonUrl = ApiEndpoint.url+"common";
		var employeeUrl = ApiEndpoint.url+"employee";
		
		var userDetail = localStorageService.get(ApiEndpoint.userKey);
		var vm = angular.extend(this, {
			update:update
		});

		(function activate() {
		getMyDetials();
		
		loadBranches();
		loadStates();
	//	$scope.loadCities()
		})();
		
		
		/*****************************************************************/
		function loadBranches(){
			var msg=""
				 var url =employeeUrl+"/getBranchList";
				genericFactory.getAll(msg,url).then(function(response) {
				vm.branches = response.data;
				console.log("branches: "+JSON.stringify(vm.branches))
								
			});
		}
		function loadStates(){
			var msg=""
				 var url =commonUrl+"/getAllState";
				genericFactory.getAll(msg,url).then(function(response) {
				vm.states = response.data;
				console.log("states: "+JSON.stringify(vm.states))
								
			});
		}
		$scope.loadCities=function(stateId){
			var msg=""
				 var url =commonUrl+"/getCitiesByState?stateId="+stateId;
				genericFactory.getAll(msg,url).then(function(response) {
				vm.cities = response.data;
				console.log("cities: "+JSON.stringify(vm.cities))
								
			});
		}
		function getMyDetials(){
				var msg=""
				 var url =customerUrl+"/getCustomerById?custId="+userDetail.specId;
				genericFactory.getAll(msg,url).then(function(response) {
				$scope.customer = response.data;
				$scope.customer.phoneNo=parseInt($scope.customer.phoneNo)
				console.log("$scope.customer: "+JSON.stringify($scope.customer))
				$scope.loadCities($scope.customer.city.state.stateId)
								
			});
		}
		function update(customer){
			var msg=""
				 var url =customerUrl+"/updateCustomer";
			genericFactory.add(msg,url,customer).then(function(response) {
			
			
				if(response.data.code==200){
					
					if($scope.editView==true){
						toastr.success(response.data.message);
					$rootScope.loader=false;
					}else{
						toastr.success(response.data.message);
						$rootScope.loader=false;
					}
					
				}else{
					toastr.error(response.data.message);
					$rootScope.loader=false;
				}
				
		});
		}
		
		/*************************future date disabled**********************/
		

	}
})();
