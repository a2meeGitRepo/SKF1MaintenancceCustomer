(function() {
	'use strict';

	angular.module('myApp.home').controller('HomeController', HomeController)
	.controller('HomeControllerNumeric', HomeControllerNumeric);

	HomeController.$inject = [ '$state', '$log',
			'$scope', 'toastr','localStorageService','ApiEndpoint','loginFactory','genericFactory','$document' ];
	
	HomeControllerNumeric.$inject = [ '$state', '$log',
		'$scope', 'toastr','localStorageService','ApiEndpoint','loginFactory','genericFactory','$document' ];

	/* @ngInject */
	function HomeController($state, $log, $scope, toastr,localStorageService,ApiEndpoint,loginFactory,genericFactory,$document) {
		var assetRegistationUrl = ApiEndpoint.url+"assetRegistation";
		var dashboardUrl = ApiEndpoint.url+"dashboard";
		var employeeUrl = ApiEndpoint.url+"employee";
		$scope.totalAsset=0;
		var vm = angular.extend(this, {
			
			statusPieLabels:[],
			statusPieColours:[],
			chartPieCharts:[],
			materialPOLine:[],
			materialResaleLine:[],
		loadMaterialPOhistory:loadMaterialPOhistory,
		loadMaterialResalehistory:loadMaterialResalehistory,
		getSelectedEmployeeData:getSelectedEmployeeData,
		loadmaterialCosthistory:loadmaterialCosthistory
		});
		$scope.year="";
		$scope.year1="";
		$scope.year2="";
		var year="";
		var year1="";
		var year2="";
		(function activate() {
		//	loadAssetCountByStatus();
			
			vm.materialPOLine=[];
			$scope.year=new Date().getFullYear();	
			year=$scope.year;
			//loadMaterialPOhistory(year);
			
			vm.materialResaleLine=[];
			$scope.year1=new Date().getFullYear();
			year1=$scope.year1;						
			//loadMaterialResalehistory(year1);
			
			$scope.year2=$scope.year1;
			year2=$scope.year1;
		//	loadmaterialCosthistory(year2)
			
		//	loadLablesForAssetWiseAssetAllocation();
			// loadAssetWiseAllocartedAssetchart();
			// loadAssetCountByAllocatedStatus();
			// loadAssetCountByComplaintStatus()
			// loadEnginners();
			/*loadTodaysTransactions()
			loadAssetTypeData();*/
		})();
		
		
		function doLogout (){
			loginFactory.ClearCredentials();
			$state.go('login');
			localStorageService.remove(ApiEndpoint.userKey);
		}

	  		
	  		
/*********************************************Pie charts***************************************************************************/
	  	/*************************************Status wise chart****************************************/	
		
	  		 vm.statusPieLabels = [ "Obsolete","Scrap","Working"];
		  		vm.chartPieSiteCharts = [];
		  		vm.chartPieOptions = {
					maintainAspectRatio: true,
					responsive: true
				}
				vm.statusPieColours =["#ffc107","#dc3545", "#28a745"];
		  		
		  		 function loadAssetCountByStatus(){
		  				var msg = null;
		  				//console.log("site data: "+JSON.stringify())
		  				
		  				var url;
					
						url =dashboardUrl+"/getDashboardDataRow1ByStatus";
						vm.chartPieCharts=[]
					
					genericFactory.getAll(msg,url).then(function(response) {
						 var graphData= response.data;
						 if(graphData.total_obsolete_asset==0 && graphData.total_working_asset==0 && graphData.total_scrap_asset==0){
							 toastr.error(" does not contain any data")
						 }
						// console.log("GRAPH DATA "+JSON.stringify(graphData))
						 vm.chartPieCharts.push(graphData.total_obsolete_asset)						
						 vm.chartPieCharts.push(graphData.total_scrap_asset)
						vm.chartPieCharts.push(graphData.total_working_asset)
						
						 $scope.totalAsset=graphData.total_assets;
						//console.log(" total Asset: "+JSON.stringify(graphData.total_assets))
						//console.log(" GRaph Arreay DATA: "+JSON.stringify(vm.chartPieCharts))
						
						
					});
		  		}
		  		 
		  		 $scope.total_alocated_asset=0;
		  /*************************************Status Allocated asset chart****************************************/
		  		 
		  		 vm.statusAllocatedPieLabels = [ "Allocated","Available"];
			  		//vm.chartPieAllocatedCharts = [];
			  		vm.chartPieAllocatedOptions = {
						maintainAspectRatio: true,
						responsive: true
					}
					vm.statusAllocatedPieColours =["#ffc107","#dc3545"];
			  		
			  		 function loadAssetCountByAllocatedStatus(){
			  				var msg = null;
			  				//console.log("site data: "+JSON.stringify())
			  				
			  				var url;
						
							url =dashboardUrl+"/getDashboardDataRow1ByStatus";
							vm.chartPieAllocatedCharts=[]
						
						genericFactory.getAll(msg,url).then(function(response) {
							 var graphData= response.data;
							
							 console.log("GRAPH DATA "+JSON.stringify(graphData))
							 vm.chartPieAllocatedCharts.push(graphData.toatal_allocated_assets)						
							 vm.chartPieAllocatedCharts.push(graphData.total_available_asset)
							
							$scope.total_alocated_asset=graphData.toatal_allocated_assets;
							 $scope.totalAsset=graphData.total_assets;
							//console.log(" site DATA: "+JSON.stringify(graphData.total_assets))
							//console.log(" GRaph Arreay DATA: "+JSON.stringify(vm.chartPieAllocatedCharts))
							
							
						});
			  		}
			  	 
			  		/************************************* type of complaints chart****************************************/
			  		 
			  		 vm.statusComplaintPieLabels = [ "Hardware","Software"];
				  		//vm.chartPieAllocatedCharts = [];
				  		vm.chartPieComplaintOptions = {
							maintainAspectRatio: true,
							responsive: true
						}
						vm.statusComplaintPieColours =["#FAF127","#9A7D0A"];
				  		
				  		 function loadAssetCountByComplaintStatus(){
				  				var msg = null;
				  				//console.log("site data: "+JSON.stringify())
				  				
				  				var url;
							
								url =dashboardUrl+"/getDashboardDataRow1ByStatus";
								vm.chartPieComplaintCharts=[]
							
							genericFactory.getAll(msg,url).then(function(response) {
								 var graphData= response.data;
								
								 //console.log("GRAPH DATA "+JSON.stringify(graphData))
								 vm.chartPieComplaintCharts.push(graphData.toatal_hardware_comp)						
								 vm.chartPieComplaintCharts.push(graphData.total_software_comp)
								
								
								 $scope.total_complaints=graphData.total_complaints;
								//console.log(" site DATA: "+JSON.stringify( $scope.total_complaints))
								//console.log(" GRaph Arreay DATA: "+JSON.stringify(vm.chartPieComplaintCharts))
								
								
							});
				  		} 
				  		 
				  		 
				  		 
				  		 
				  /*************************************Status Asset Wise Allocated asset chart****************************************/
				  		 
				  		 vm.statusAssetWiseAllocatedPieLabels = [];
				  		 
				  		 function loadLablesForAssetWiseAssetAllocation(){
				  			 
				  			 var msg="";
				  			 var url=""
				  			url =dashboardUrl+"/getDashboardDataRow1";
				  			genericFactory.getAll(msg,url).then(function(response) {
								 var graphDataLabels= response.data;								
								
								 for(var i=0;i<graphDataLabels.length;i++){
									 
									 vm.statusAssetWiseAllocatedPieLabels.push(graphDataLabels[i].asset_name);
								 }														
					
								//console.log(" GRaph Arreay DATA: "+JSON.stringify(vm.statusAssetWiseAllocatedPieLabels))
							});
				  			 
				  			 
				  		 }
					  		//vm.chartPieAllocatedCharts = [];
					  		vm.chartPieAssetWiseAllocatedOptions = {
								maintainAspectRatio: true,
								responsive: true
							}
							vm.statusAssetWiseAllocatedPieColours =["#ffc107","#dc3545"];
					  		
					  		 function loadAssetWiseAllocartedAssetchart(){
					  				var msg = null;
					  				var url="";
								
									url =dashboardUrl+"/getDashboardDataRow1";
									vm.chartPieAssetWiseAllocatedCharts=[]
								
								genericFactory.getAll(msg,url).then(function(response) {
									 var graphData= response.data;
									 for(var i=0;i<graphData.length;i++){										 
										 vm.chartPieAssetWiseAllocatedCharts.push(graphData[i].asset_count);
									 }
									// console.log("GRAPH DATA "+JSON.stringify(graphData))
									//console.log(" GRaph Arreay DATA: "+JSON.stringify(vm.chartPieAssetWiseAllocatedCharts))
								});
					  		}
			 /*************************************Material PO History chart****************************************/
			  		 vm.materialPOLineLabels = [ "Jan","FEB","MAR","APR","MAY","JUNE","JUL","AUG","SEPT","OCT","NOV","DEC"];
				  		//vm.chartPieAllocatedCharts = [];
				  		vm.materialPOLineOptions = {
							maintainAspectRatio: true,
							responsive: true
						}
						vm.materialPOLineColours =["#ffc107","#dc3545"];
			  		 
				  		
				  		 function loadMaterialPOhistory(year){
				  			 
				  			 if(year==undefined || year==""){
				  				 
				  				 toastr.info("Welcome....!")
				  				 
				  			 }else{
				  				var msg = null;
				  				//console.log("year: "+JSON.stringify(year))
				  				
				  				var url;
							
								url =dashboardUrl+"/getDashboardDataRow2?year="+year;
								vm.materialPOLine=[]
							
							genericFactory.getAll(msg,url).then(function(response) {
								 var graphData= response.data;
								
								 
								//console.log("GRAPH DATA "+JSON.stringify(graphData))
								vm.materialPOLine.push(graphData.total_po_jan)						
								 vm.materialPOLine.push(graphData.total_po_feb)
								  vm.materialPOLine.push(graphData.total_po_mar)
								   vm.materialPOLine.push(graphData.total_po_apr)
								    vm.materialPOLine.push(graphData.total_po_may)
								     vm.materialPOLine.push(graphData.total_po_june)
								      vm.materialPOLine.push(graphData.total_po_jul)
								       vm.materialPOLine.push(graphData.total_po_aug)
								        vm.materialPOLine.push(graphData.total_po_sep)
								         vm.materialPOLine.push(graphData.total_po_oct)
								          vm.materialPOLine.push(graphData.total_po_nov)
								           vm.materialPOLine.push(graphData.total_po_dec)
								
								
								 $scope.totalPo=graphData.total_po_Year;
								//console.log(" year data: "+JSON.stringify(graphData.total_assets))
								//console.log(" GRaph month DATA: "+JSON.stringify(vm.materialPOLine))
								
								 
							});
				  			 }
				  		}
				  		 
				  		 
				  		 
				  		 
				  		 
		/*************************************Material Resale History chart****************************************/
				  		 vm.materialResaleLineLabels = [ "Jan","FEB","MAR","APR","MAY","JUNE","JUL","AUG","SEPT","OCT","NOV","DEC"];
					  		//vm.chartPieAllocatedCharts = [];
					  		vm.materialResaleLineOptions = {
								maintainAspectRatio: true,
								responsive: true
							}
							vm.materialResaleLineColours =["#ffc107","#dc3545"];
				  		 
					  		
					  		 function loadMaterialResalehistory(year1){
					  			 
					  			 if(year1==undefined || year1==""){					  				 
					  				 toastr.info("Welcome")
					  				 
					  			 }else{
					  				var msg = null;
					  				//console.log("year: "+JSON.stringify(year1))
					  				
					  				var url;
								
									url =dashboardUrl+"/getDashboardDataRow2Col?year="+year1;
									vm.materialResaleLine=[]
								
								genericFactory.getAll(msg,url).then(function(response) {
									 var graphData= response.data;
									
									  
									 console.log("GRAPH DATA "+JSON.stringify(graphData))
									vm.materialResaleLine.push(graphData.total_po_jan)						
									 vm.materialResaleLine.push(graphData.total_po_feb)
									  vm.materialResaleLine.push(graphData.total_po_mar)
									   vm.materialResaleLine.push(graphData.total_po_apr)
									    vm.materialResaleLine.push(graphData.total_po_may)
									     vm.materialResaleLine.push(graphData.total_po_june)
									      vm.materialResaleLine.push(graphData.total_po_jul)
									       vm.materialResaleLine.push(graphData.total_po_aug)
									        vm.materialResaleLine.push(graphData.total_po_sep)
									         vm.materialResaleLine.push(graphData.total_po_oct)
									          vm.materialResaleLine.push(graphData.total_po_nov)
									           vm.materialResaleLine.push(graphData.total_po_dec)
									
									
									 $scope.totalResale=graphData.total_po_Year;
									//console.log(" year data: "+JSON.stringify( $scope.totalResale))
									//console.log(" GRaph month DATA: "+JSON.stringify( vm.materialResaleLine))
									
									 
								});
					  		}
					  	}
		/*************************************P.O. Material Cost  History chart****************************************/
					  		 vm.materialCostLineLabels = [ "Jan","FEB","MAR","APR","MAY","JUNE","JUL","AUG","SEPT","OCT","NOV","DEC"];
						  		//vm.chartPieAllocatedCharts = [];
						  		vm.materialCosLineOptions = {
									maintainAspectRatio: true,
									responsive: true
								}
								vm.materialCostLineColours =["#ffc107","#dc3545"];
					  		 
						  		
						  		 function loadmaterialCosthistory(year1){
						  			 
						  			 if(year1==undefined || year1==""){					  				 
						  				 toastr.info("Welcome")
						  				 
						  			 }else{
						  				var msg = null;
						  				//console.log("year: "+JSON.stringify(year1))
						  				
						  				var url;
									
										url =dashboardUrl+"/getDashboardDataRow4Col?year="+year1;
										vm.materialCostLine=[]
									
									genericFactory.getAll(msg,url).then(function(response) {
										 var graphData= response.data;
										
										  
										 //console.log("GRAPH DATA "+JSON.stringify(graphData))
										vm.materialCostLine.push(graphData.total_assetCost_jan)						
										 vm.materialCostLine.push(graphData.total_assetCost_feb)
										  vm.materialCostLine.push(graphData.total_assetCost_mar)
										   vm.materialCostLine.push(graphData.total_assetCost_apr)
										    vm.materialCostLine.push(graphData.total_assetCost_may)
										     vm.materialCostLine.push(graphData.total_assetCost_june)
										      vm.materialCostLine.push(graphData.total_assetCost_jul)
										       vm.materialCostLine.push(graphData.total_assetCost_aug)
										        vm.materialCostLine.push(graphData.total_assetCost_sep)
										         vm.materialCostLine.push(graphData.total_assetCost_oct)
										          vm.materialCostLine.push(graphData.total_assetCost_nov)
										           vm.materialCostLine.push(graphData.total_assetCost_dec)
										
										
										 $scope.totalCostPerYear=graphData.total_assetCost_Year;
										//console.log(" year data: "+JSON.stringify( $scope.totalCostPerYear))
										//console.log(" GRaph month DATA: "+JSON.stringify( vm.materialCostLine))
										
										 
									});
						  		}
						  	}					  		 
	
			  		 
/*********************************************Pie charts ends**********************************************************************/
	  		

		/*function loadCategory(){
		     var msg=""
				 var url =assetRegistationUrl+"/getCategoryList";
				genericFactory.getAll(msg,url).then(function(response) {
				vm.categories = response.data;
				console.log("categories q: "+JSON.stringify(vm.categories))
				angular.forEach(vm.categories, function(items){
					vm.statusPieLabels.push(items.categoryName)
					vm.statusPieColours.push(items.colorCode)
					 var url =assetRegistationUrl+"/getAssetRegisterCountByCategory?categoryId="+items.categoryId;
					genericFactory.getAll(msg,url).then(function(response) {
						var count = response.data;
						$scope.totalAsset +=count
						vm.chartPieCharts.push(count)
						console.log("count: "+JSON.stringify(count))
					})
				   });
				
			})
		}*/
	  		  		
	  		function loadEnginners(){
				
				var msg=""
				 var url =employeeUrl+"/getAllEngineers";
				genericFactory.getAll(msg,url).then(function(response) {
				vm.engineers = response.data;
				//console.log("engineers List: "+JSON.stringify(vm.engineers))
								
			});
		}
	  		
	  		/*var r=angular.element( 
                    document.querySelector(":root"));*/
	  		
	  		function getSelectedEmployeeData(engineer){
	  			//console.log("engineers: "+JSON.stringify(engineer))
				var msg=""
				 var url =dashboardUrl+"/getDashboardDataRow4?engineerId="+engineer.employeeId;
				genericFactory.getAll(msg,url).then(function(response) {
				vm.engineersData = response.data;
				//console.log("selected engineers Data: "+JSON.stringify(vm.engineersData))
				//console.log("selected engineers Data: "+JSON.stringify(vm.engineersData.progress_bar_close+"%"))
				
				$scope.closeCss={
						
						"width":vm.engineersData.progress_bar_close+'%',
						"background-color":"#4CAF50",
						"margin-left":"-15px",
						"position":"relative",
						"border":"1px solid #D4EFDF",
				  		"border-radius":"20px"
						}
				
				$scope.openCss={
					
					"width":vm.engineersData.progress_bar_open+'%',
					"background-color":"#F39C12",
					"margin-left":"-15px",
					"position":"relative",
					"border":"1px solid #D4EFDF",
			  		"border-radius":"20px"
					}
				
				
				$scope.inProCss={
					
					"width":vm.engineersData.progress_bar_inProcess+'%',
					"background-color":"#3498DB",
					"margin-left":"-15px"	,
					"position":"relative",
					"border":"1px solid #D4EFDF",
			  		"border-radius":"20px"
					}
				
				
				$scope.pendCss={
						
						"width":vm.engineersData.progress_bar_pending+'%',
						"background-color":"#F4D03F",
						"margin-left":"-15px"	,
						"position":"relative",
						"border":"1px solid #D4EFDF",
				  		"border-radius":"20px"
						}
				
				/*r.style.setProperty('--closed','#2ECC71 ');
				r.style.setProperty('--closedWidth',vm.engineersData.progress_bar_close+'px');
				
				r.style.setProperty('--open','#F4D03F');
				r.style.setProperty('--openWidth',vm.engineersData.progress_bar_open+'px');
				
				r.style.setProperty('--inPro','#3498DB');
				r.style.setProperty('--inWidth',vm.engineersData.progress_bar_inProcess+'px');*/
				
				
			});
		}
	  
	}	
	
/*********************************************controller for NUmeric Dash board****************************************************************/	
	
	function HomeControllerNumeric($state, $log, $scope, toastr,localStorageService,ApiEndpoint,loginFactory,genericFactory,$document) {
		var dashboardUrl = ApiEndpoint.url+"dashboard";
		
		var vm = angular.extend(this, {
			
			
		});
		
		(function activate() {
			
			loadAllCountForNumDash();
			
		})();
		
		
		function loadAllCountForNumDash(){
			
			var msg=""
				 var url =dashboardUrl+"/getDashboardDataRow3";
				genericFactory.getAll(msg,url).then(function(response) {
					vm.CounDAtaNumDash=response.data;
					
				//console.log("Count Data 2nd dash: "+JSON.stringify(vm.CounDAtaNumDash));
					
					
					
					
				});
			
		}
		
		
		
		
		
		
		
		
		
		
		
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
})();
