(function() {
	'use strict';

	angular
		.module('myApp.generic')
		.factory('genericFactory', genericFactory).service('fileUpload',
				[ '$http', 'toastr', '$rootScope','$window',function($http, toastr,$rootScope,$window) {
					this.uploadFileToUrl = function(file, uploadUrl) {
						var fd = new FormData();
						fd.append('file', file);
						$http.post(uploadUrl, fd, {
							transformRequest : angular.identity,
							headers : {
								'Content-Type' : undefined
							}
						}).then(function(response) {
							$window.location.reload();
						
							
							
						});
					}
				} ]);;

	genericFactory.$inject = ['genericHttpFactory', '$q', 'toastr','$mdDialog'];
	
	/* @ngInject */
	function genericFactory(genericHttpFactory, $q, toastr,$mdDialog) {
		var service = {			
			getAll : getAll,
			delet : delet,
			add : add,
			addList : addList,
			get :get,
			active : active,
			addReturn:addReturn,
			showAlert:showAlert,
			login:login,
			getAllWithHeader:getAllWithHeader,
		};
		return service;

		// ***************************************************************

		function getAll(msg,url) {
			var deferred = $q.defer();
			genericHttpFactory.getAll(url).then(function(response){
			//	toastr.success(msg);
				deferred.resolve(response);
			}, function(err){
				//alert(JSON.stringify(err.statusText));
			});
			return deferred.promise;
		}
		function getAllWithHeader(msg,url,header) {
			var deferred = $q.defer();
			genericHttpFactory.getAllWithHeader(url,header).then(function(response){
			//	toastr.success(msg);
				deferred.resolve(response);
			}, function(err){
				//alert(JSON.stringify(err.statusText));
			});
			return deferred.promise;
		}
		function login(msg,url,entity){
			var deferred = $q.defer();
			genericHttpFactory.login(url,entity).then(function(response){
				//toastr.success(msg);
				deferred.resolve(response);
			}, function(err){
				toastr.error(err.status+' : '+err.statusText, 'Error !!');
			});
			return deferred.promise;
		}
		function delet(msg,url,entity){
			var deferred = $q.defer();
			genericHttpFactory.delet(url,entity).then(function(response){
				toastr.success(msg);
				deferred.resolve(response);
			}, function(err){
				toastr.error(err.status+' : '+err.statusText, 'Error !!');
			});
			return deferred.promise;
		}
		
		function active(msg,url,entity){
			var deferred = $q.defer();
			genericHttpFactory.active(url,entity).then(function(response){
				toastr.success(msg);
				deferred.resolve(response);
			}, function(err){
				toastr.error(err.status+' : '+err.statusText, 'Error !!');
			});
			return deferred.promise;
		}
		
		function add(msg,url,entity){
			var deferred = $q.defer();
			genericHttpFactory.add(url,entity).then(function(response){
				//toastr.success(msg);
				deferred.resolve(response);
			}, function(err){
				toastr.error(err.status+' : '+err.statusText, 'Error !!');
			});
			return deferred.promise;
		}
		
		function addReturn(msg,url,entity) {
			var deferred = $q.defer();
			genericHttpFactory.addReturn(url,entity).then(function(response){
			//	toastr.success(msg);
				deferred.resolve(response);
			}, function(err){
				alert(JSON.stringify(err.statusText));
			});
			return deferred.promise;
		}
		
		function addList(msg,url,entities){
			var deferred = $q.defer();
			genericHttpFactory.addList(url,entities).then(function(response){
				toastr.success(msg);
				deferred.resolve(response);
			}, function(err){
				toastr.error(err.status+' : '+err.statusText, 'Error !!');
			});
			return deferred.promise;
		}

		function get(msg,url,entity_id){
			var deferred = $q.defer();
			genericHttpFactory.get(msg,url,entity_id).then(function(response){
				toastr.success(msg);
				deferred.resolve(response);
			}, function(err){
				toastr.error(err.status+' : '+err.statusText, 'Error !!');
			});
			return deferred.promise;
		}
		
		
		function showAlert(containt) {
		      alert = $mdDialog.alert({
		        title: containt.title,
		        textContent:containt.massage,
		        ok: 'Close'
		      });

		      $mdDialog
		        .show( alert )
		        .finally(function() {
		          alert = undefined;
		        });
		    }
	}

})();