(function () {
	'use strict';

	angular
		.module('myApp.generic')
		.factory('genericHttpFactory', genericHttpFactory);

	genericHttpFactory.$inject = ['$http', '$q', '_','localStorageService','ApiEndpoint' ];

	/* @ngInject */
	function genericHttpFactory($http, $q, _,localStorageService,ApiEndpoint) {
		var header = localStorageService.get(ApiEndpoint.headerKey);
	//	console.log("Header key  head:: "+header)
		var service = {
			add : add,
			addList : addList,
			get : get,
			getAll : getAll,
			delet : delet,
			active : active,
			addReturn:addReturn,
			login:login,
			getAllWithHeader:getAllWithHeader,
		};

		return service;
	
		
		function getAll(url){
			console.log("Header key  :: "+header)
			return $http.get(url,{
			    headers: {'Authorization':"Bearer "+header}
			});
		}
		function getAllWithHeader(url,headerKey){
			console.log("Header key  Manual :: "+headerKey)
			return $http.get(url,{
			    headers: {'Authorization':"Bearer "+headerKey}
			});
		}

		function login(url,entity){
			//console.log("Header key  :: "+header)
			return $http.post(url,entity);
		}
		function delet(url,entity){
			return $http.post(url,entity);
		}
		
		function active(url,entity){
			return $http.post(url,entity);
		}
		
		function add(url,entity){
			//return $http.post(url, entity);
			
			return $http.post(url, entity ,{
			    headers: {'Authorization':"Bearer "+header}
			});
		}
		
		function addList(url,entities){
			return $http.post(url, entities);
		}

		function addReturn(url,entities){
			return $http.get(url,entities);
		}
		function get(url,entity_id){
			return $http.get(url+entity_id);
		}
		
	}
})();
